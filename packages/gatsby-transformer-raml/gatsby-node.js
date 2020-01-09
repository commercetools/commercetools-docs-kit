const firstline = require('firstline');
const jsYaml = require('js-yaml');
const createTypeNode = require('./src/create-type-node');
const createResourceNode = require('./src/create-resource-node');
const createJsYamlSchema = require('./src/create-js-yaml-schema');
const defineSchema = require('./src/schema/define-schema');

const sourceNodes = ({ actions, schema }) => {
  // Add type definitions to the GraphQL schema.
  const { createTypes } = actions;

  defineSchema({ schema, createTypes });
};

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
  loadNodeContent,
  reporter,
}) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  const ramlIndicator = await firstline(node.absolutePath);

  if (
    ramlIndicator.trim() === '#%RAML 1.0 DataType' ||
    ramlIndicator.trim() === '# Resource'
  ) {
    const content = await loadNodeContent(node);
    const JSYAML_SCHEMA = createJsYamlSchema();

    try {
      const parsedContent = jsYaml.load(content, { schema: JSYAML_SCHEMA });

      const { createNode, createParentChildLink } = actions;

      if (ramlIndicator.trim() === '#%RAML 1.0 DataType') {
        createTypeNode({
          type: parsedContent,
          fileNode: node,
          createNode,
          createNodeId,
          createParentChildLink,
          createContentDigest,
        });
      } else {
        createResourceNode({
          resource: parsedContent,
          fileNode: node,
          createNode,
          createNodeId,
          createParentChildLink,
          createContentDigest,
        });
      }
    } catch (e) {
      reporter.error(e);
    }
  }
}

exports.sourceNodes = sourceNodes;
exports.onCreateNode = onCreateNode;
