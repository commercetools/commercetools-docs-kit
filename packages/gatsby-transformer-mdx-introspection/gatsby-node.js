const merge = require('deepmerge');
const transformMdx = require('./src/transform-mdx');
const { collapseWhitespace: collapseSpace } = require('./src/jsx-ast-utils');

// Cache key for getReducedForest (dependent on file digest & options)
const reducedCacheKey = (node, options) =>
  `transformer-mdx-introspection-forest-${
    node.internal.contentDigest
  }.${JSON.stringify(options)}`;

const defaultOptions = {
  // Whether to have the `component` field (and `attribute.name`) be all lower case (legacy)
  lowercaseIdentifiers: false,
  // Whether to trim leading/trailing whitespace in JSX snippets and string literals
  trimWhitespace: true,
  // Whether to collapse consecutive whitespace in JSX snippets and string literals
  collapseWhitespace: true,
  // Whether to attach the original JSX AST nodes to the generated node output
  // Needed to query `ComponentInMdx.ast` successfully
  attachAST: false,
  // Whether to remove attributes that are (usually) artifacts of MDX compilation:
  // parentName and mdxType
  removeMdxCompilationArtifacts: true,
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
    'MDXLayout',
  ],
};

// Generated node name
const nodeName = 'ComponentInMdx';

/**
 * Adds default plugin options to the user options, letting user options
 * override default options
 * @param {object} options User-set options object
 */
function addDefaults(options) {
  return { ...defaultOptions, ...options };
}

/**
 * Calls a function for each node in a generic subtree where each element has "children"
 * @param {object} node Generic tree node
 * @param {function} effect Side effect to call on each node
 */
function visit(node, effect) {
  effect(node);
  if (typeof node === 'object' && 'children' in node) {
    node.children.forEach(child => visit(child, effect));
  }
}

/**
 * Utility method to implement common query functionality between
 * childrenComponentInMdx and childComponentInMdx
 * @param {object} node Gatsby ComponentInMdx node
 * @param {object} context Gatsby API helpers context
 */
async function queryChildren(node, context, { filter, sort, deep, first }) {
  let baseFilter = {};

  if (deep) {
    // Traverse data model to find all children IDs
    const allDeepChildrenIds = [];
    node.tree.forEach(n =>
      visit(n, child => {
        if (typeof child === 'object') {
          allDeepChildrenIds.push(child.id);
        }
      })
    );
    baseFilter = { id: { in: allDeepChildrenIds } };
  } else {
    // Directly query children
    baseFilter = { parent: { id: { eq: node.id } } };
  }

  // Perform query
  const derivedFilter = merge(filter, baseFilter);
  const result = await context.nodeModel.runQuery({
    query: { filter: derivedFilter, sort },
    type: nodeName,
    firstOnly: first,
  });
  return result;
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(
    `"""
     JSX element attribute with left-hand identifier and right-hand value
     """
     type Attribute {
       "Attribute left-hand identifier (or shorthand identifier)"
       name: String!
       "Attribute right-hand value (or JSX expression snippet)"
       value: JSON
     }

     """
     Single JSX element that was contained in a compiled MDX file's output
     """
     type ${nodeName} implements Node @childOf(types: ["${nodeName}", "Mdx"], many: true) @dontInfer {
       "JSX component/tag/element name"
       component: String!
       "Original JSX snippet from compiled MDX"
       jsx: String!
       "Array of attribute objects describing each parseable attribute specified"
       attributes: [Attribute!]!
       "Whether the component is a root node of the MDX document (or of its own detached subtree)"
       isRoot: Boolean!
       "Whether the component is from a component tree that wasn't in the direct document tree"
       isDetached: Boolean!
       "Array of component nodes that are children of the current node"
       tree: [JSON!]!
       "Original JSX AST subtree from Babel; only attached if \`attachAST\` is set to \`true\` in the plugin config"
       ast: JSON
       "Original MDX file parent node"
       mdx: Mdx! @link
       "Text content of the current node. To configure text processing rules, use collapse/trim"
       content(collapse: Boolean, trim: Boolean): String!
       "A single child JSX/HTML node (excluding text children). If deep is set, then the field could take the value of any child of children of this node at any level"
       child${nodeName}: ${nodeName}
       "All child JSX/HTML nodes (excluding text children). If deep is set, then the field will return all children of children of this node at any level"
       children${nodeName}: [${nodeName}]
     }`
  );
};

exports.createResolvers = (
  { createResolvers, intermediateSchema, reporter },
  options
) => {
  const { attachAST } = addDefaults(options);
  const typeMap = intermediateSchema.getTypeMap();
  const filterType = typeMap[`${nodeName}FilterInput`];
  const sortType = typeMap[`${nodeName}SortInput`];

  // Closure: whether the user has been warned about AST resolution
  let hasWarned = false;

  createResolvers({
    [nodeName]: {
      [`children${nodeName}`]: {
        args: {
          filter: filterType,
          sort: sortType,
          limit: 'Int',
          skip: 'Int',
          deep: 'Boolean',
        },
        resolve: async (source, args, context) => {
          const { filter, sort, limit, skip, deep } = args;
          const result = await queryChildren(source, context, {
            filter,
            sort,
            deep,
            first: false,
          });

          // Apply limit/skip
          if (result == null) return [];
          if (limit != null) {
            const resolvedSkip = skip == null ? 0 : skip;
            return result.slice(resolvedSkip, resolvedSkip + limit);
          }
          return result;
        },
      },
      [`child${nodeName}`]: {
        args: {
          filter: filterType,
          sort: sortType,
          deep: 'Boolean',
        },
        resolve: async (source, args, context) => {
          const { filter, sort, deep } = args;
          const result = await queryChildren(source, context, {
            filter,
            sort,
            deep,
            first: true,
          });
          return result;
        },
      },
      ast: {
        resolve: source => {
          // Don't attach ASTs by default to prevent heap bloat
          if (!attachAST) {
            if (!hasWarned) {
              reporter.warn(
                'Original JSX ASTs were not attached to nodes. Enable `attachAST` ' +
                  'in the config to support querying the `ast` field'
              );
              hasWarned = true;
            }
          }
          return source.ast || null;
        },
      },
      content: {
        resolve: (source, args) => {
          const { trim, collapse } = args;
          let text = '';

          source.tree.forEach(node =>
            visit(node, child => {
              if (typeof child === 'string') {
                text += child;
              }
            })
          );

          const trimmed = trim ? text.trim() : text;
          const collapsed = collapse ? collapseSpace(trimmed) : trimmed;
          return collapsed;
        },
      },
    },
  });
};

exports.onCreateNode = (
  { node, actions, createNodeId, createContentDigest, cache, reporter },
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
      cache,
      reporter,
    });
  }
};

/**
 * Evaluates the reduced component forest of the given MDX file, attempting
 * to pull from the cache before performing any computations
 * @param {object} cache Gatsby Cache object
 * @param {object} node MDX Gatsby node
 * @param {object} options User-specified plugin options
 */
async function getReducedForest(cache, node, options) {
  const withDefaults = addDefaults(options);

  // Resolve applied options
  const {
    lowercaseIdentifiers,
    removeMdxCompilationArtifacts,
    trimWhitespace,
    collapseWhitespace,
    attachAST,
    excludeTags,
  } = withDefaults;
  const appliedOptions = {
    lowercaseIdentifiers,
    removeMdxCompilationArtifacts,
    trimWhitespace,
    collapseWhitespace,
    attachAST,
    excludeTags,
  };

  const cacheKey = reducedCacheKey(node, appliedOptions);
  const cachedForest = await cache.get(cacheKey);
  if (cachedForest) {
    return cachedForest;
  }

  const reducedForest = await transformMdx(node.rawBody, withDefaults);
  await cache.set(cacheKey, reducedForest);
  return reducedForest;
}

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
  cache,
  reporter,
}) {
  const { removeMdxCompilationArtifacts } = addDefaults(options);
  if (removeMdxCompilationArtifacts) {
    // Make sure there aren't any of the existing attributes in the raw MDX
    // If there are, then warn
    const performCheck = attribute => {
      if (
        node.rawBody.includes(`${attribute}:`) ||
        node.rawBody.includes(`${attribute}=`)
      ) {
        reporter.warn(
          `An MDX file at ${node.fileAbsolutePath} includes '${attribute}' as a string.
          The mdx introspection plugin is currently configured to remove this if it appears as an attribute`
        );
      }
    };

    performCheck('mdxType');
    performCheck('parentName');
  }

  getReducedForest(cache, node, options)
    .then(reducedForest => {
      const { createNode, createParentChildLink } = actions;

      // the exact same JSX could be on one page twice, use a counter to differentiate
      let index = 0;

      // Traverse tree and create nodes, starting with the root
      function createComponentInMdxNode(
        componentNode,
        isRoot,
        parentGatsbyNode,
        isDetached
      ) {
        if (typeof componentNode === 'string') return;
        let newParent = parentGatsbyNode;

        if (componentNode.hasGatsbyNode) {
          const { children, mdxAST, ...rest } = componentNode;
          const idBase = `${node.id}.${componentNode.component}.${index} >>> COMPONENT_IN_MDX`;
          const id = createNodeId(idBase);
          const newNode = {
            id: createNodeId(idBase),
            parent: parentGatsbyNode.id,
            children: [],
            internal: {
              contentDigest: createContentDigest(componentNode),
              type: 'ComponentInMdx',
            },
            // Link MDX file tree root
            mdx: node.id,
            // data
            tree: children,
            ast: mdxAST,
            isRoot,
            isDetached,
            ...rest,
          };

          // Link data model to Gatsby for custom resolver
          // eslint-disable-next-line no-param-reassign
          componentNode.id = id;
          createNode(newNode);
          createParentChildLink({
            parent: parentGatsbyNode,
            child: componentNode,
          });
          newParent = newNode;
          index += 1;
        }

        // If the current node was skipped because hasGatsbyNode is false and was supposed to be
        // root, then the children should count as root nodes
        const areChildrenRoot = !componentNode.hasGatsbyNode && isRoot;

        // Create nodes for all children
        componentNode.children.forEach(childNode => {
          createComponentInMdxNode(
            childNode,
            areChildrenRoot,
            newParent,
            isDetached
          );
        });
      }

      // Create nodes for all trees
      reducedForest.forEach((tree, i) =>
        // All non-first trees are detached
        createComponentInMdxNode(tree, true, node, i !== 0)
      );
    })
    .catch(error => {
      reporter.error(String(error));
    });
}
