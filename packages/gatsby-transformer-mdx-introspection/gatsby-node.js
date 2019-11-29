const remark = require('remark');
const mdx = require('remark-mdx');
const generateComponentNodeObject = require('./src/generate-component-node-object');

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type ComponentInMdx implements Node @dontInfer {
      component: String!
      attributes: [Attribute!]
    }

    type Attribute {
      name: String!
      value: String
    }
  `);
};

exports.onCreateNode = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === 'Mdx') {
    introspectMdx({
      node,
      createNodeId,
      createContentDigest,
      actions,
    });
  }
};

async function introspectMdx({
  node,
  createNodeId,
  createContentDigest,
  actions,
}) {
  await remark()
    .use(mdx)
    .use(() => tree => {
      const { children } = tree;
      let jsxId = 0; // the exact same JSX could be on one page twice, use a counter to differentiate
      children.forEach(child => {
        if (child.type === 'jsx') {
          createComponentInMdxNode({
            node,
            createNodeId,
            createContentDigest,
            actions,
            jsxString: child.value,
            jsxId,
          });
          jsxId += 1;
        }
      });
    })
    .process(node.rawBody);
}

function createComponentInMdxNode({
  node,
  createNodeId,
  createContentDigest,
  actions,
  jsxString,
  jsxId,
}) {
  const { createNode, createParentChildLink } = actions;

  const componentInMdxObj = generateComponentNodeObject(jsxString);

  const componentInMdxNode = {
    ...componentInMdxObj,
    id: createNodeId(`$${node.id}.${jsxId} >>> COMPONENT_IN_MDX`),
    parent: node.id,
    children: [],
    internal: {
      contentDigest: createContentDigest(componentInMdxObj),
      type: 'ComponentInMdx',
    },
  };

  createNode(componentInMdxNode);
  createParentChildLink({ parent: node, child: componentInMdxNode });
}
