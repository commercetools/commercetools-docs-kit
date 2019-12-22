const mdx = require('@mdx-js/mdx');
const babelParser = require('@babel/parser');
const jsxAstUtils = require('./src/jsx-ast-utils');
const reduceJsxAst = require('./src/reduce-jsx-ast');

// Default plugin options
const defaultOptions = {
  // Whether to have the `component` field be all lower case (legacy)
  lowercaseTags: false,
  // Whether to trim leading/trailing whitespace in JSX snippets and string literals
  trimWhitespace: true,
  // Whether to collapse consecutive whitespace in JSX snippets and string literals
  collapseWhitespace: true,
  // Whether to attach the original JSX AST nodes to the generated node output
  // Needed to query `ComponentInMdx.ast` successfully
  attachAST: false,
  // Predicate function used as a performance escape hatch to filter MDX files that
  // get parsed/indexed
  shouldIndexNode: () => true,
  // JSX components that do not generate Gatsby nodes in the final output (they still
  // appear as other components' children and their children can generate nodes)
  excludeTags: [
    'p',
    'tr',
    'th',
    'td',
    'li',
    'span',
    'em',
    'strong',
    'del',
    'code',
  ],
};

/**
 * Adds default plugin options to the user options, letting user options
 * override default options
 * @param {object} options User-set options object
 */
function addDefaults(options) {
  return { ...defaultOptions, ...options };
}

exports.createSchemaCustomization = ({ actions, schema }, options) => {
  const { attachAST } = addDefaults(options);
  actions.createTypes([
    `# JSX element attribute with left-hand identifier and right-hand value
     type Attribute {
        # Attribute left-hand identifier (or shorthand identifier)
        name: String!
        # Attribute right-hand value (or JSX expression snippet)
        value: String
      }`,
    // Build schema using schema creation API to support resolvers
    schema.buildObjectType({
      name: 'ComponentInMdx',
      interfaces: ['Node'],
      extensions: { infer: false },
      description:
        "Single JSX element that was contained in a compiled MDX file's output",
      fields: {
        component: {
          type: 'String!',
          description: 'JSX component/tag/element name',
        },
        jsx: {
          type: 'String!',
          description: 'Original JSX snippet from compiled MDX',
        },
        attributes: {
          type: '[Attribute!]!',
          description:
            'Array of attribute objects describing each parseable attribute specified',
        },
        // Lazily resolve complex tree values via internal property to
        // avoid node tracking/type issues
        jsxChildren: {
          type: '[JSON!]!',
          description:
            'Array of component nodes that are children of the current node',
          resolve: source => source.internal.original.children,
        },
        ast: {
          type: 'JSON',
          description:
            'Original JSX AST subtree from Babel; only attached if `attachAST` is set' +
            ' to `true` in the plugin config',
          resolve: source => {
            // Don't attach ASTs by default to prevent heap bloat
            if (!attachAST) {
              console.warn(
                'Original JSX ASTs were not attached to nodes. Enable `attachAST` ' +
                  'in the config to support querying the `ast` field'
              );
            }
            return source.internal.original.ast || null;
          },
        },
      },
    }),
  ]);
};

exports.onCreateNode = (
  { node, actions, createNodeId, createContentDigest },
  options
) => {
  const { shouldIndexNode } = addDefaults(options);
  if (node.internal.type === 'Mdx' && shouldIndexNode(node)) {
    introspectMdx({
      node,
      createNodeId,
      createContentDigest,
      actions,
      options,
    });
  }
};

/**
 * Introspects the given Mdx gatsby node to find all valid JSX component
 * nodes and creates them as gatsby ComponentInMdx nodes
 */
function introspectMdx({
  node,
  createNodeId,
  createContentDigest,
  actions,
  options,
}) {
  mdx(node.rawBody)
    .then(jsx => {
      const ast = babelParser.parse(jsx, {
        sourceType: 'module',
        plugins: ['jsx'],
      });
      const contentRoot = jsxAstUtils.findContentRoot(ast);
      const reducedForest = reduceJsxAst(
        contentRoot,
        jsx,
        addDefaults(options)
      );

      // Coalesce all simple component trees into a list of their non-ignored nodes
      const componentNodes = reducedForest.reduce(
        (accum, tree) => [...accum, ...getAllComponentNodes(tree)],
        []
      );

      componentNodes.forEach((componentNode, index) => {
        if (!componentNode.hasGatsbyNode) return;
        createComponentInMdxNode({
          node,
          createNodeId,
          createContentDigest,
          actions,
          componentNode,
          original: node.body, // use to extract raw JSX from compiled MDX
          index, // the exact same JSX could be on one page twice, use a counter to differentiate
        });
      });
    })
    .catch(error => console.log(error));
}

/**
 * Gets all component nodes from a tree, recursively traversing all children
 * @param {object} reducedTree Reduced component tree output from reduceJsxAst
 */
function getAllComponentNodes(reducedTree) {
  const children = [];

  function traverse(node) {
    if (typeof node === 'object') {
      if (node.hasGatsbyNode) {
        children.push(node);
      }

      node.children.forEach(traverse);
    }
  }

  traverse(reducedTree);
  return children;
}

// Export for unit testing
exports.getAllComponentNodes = getAllComponentNodes;

/**
 * Creates the final ComponentInMdx node from the reduced component node objec,
 * attaching its ast/children to an internal property of the gatsby as to avoid
 * potential tracking/type issues
 */
function createComponentInMdxNode({
  node,
  createNodeId,
  createContentDigest,
  actions,
  componentNode,
  index,
}) {
  const { createNode, createParentChildLink } = actions;
  const { ast, children, ...rest } = componentNode;
  const componentInMdxNode = {
    ...rest,
    id: createNodeId(
      `${node.id}.${componentNode.component}.${index} >>> COMPONENT_IN_MDX`
    ),
    parent: node.id,
    children: [],
    internal: {
      contentDigest: createContentDigest(componentNode),
      type: 'ComponentInMdx',
      original: {
        ast,
        children,
      },
    },
  };

  createNode(componentInMdxNode);
  createParentChildLink({ parent: node, child: componentInMdxNode });
}
