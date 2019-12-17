const firstline = require('firstline');
const jsYaml = require('js-yaml');
const createTypeNode = require('./src/create-type-node');
const createJsYamlSchema = require('./src/create-js-yaml-schema');

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

  if (ramlIndicator.trim() === '#%RAML 1.0 DataType') {
    const content = await loadNodeContent(node);
    const JSYAML_SCHEMA = createJsYamlSchema();

    try {
      const parsedContent = jsYaml.load(content, { schema: JSYAML_SCHEMA });

      const { createNode, createParentChildLink } = actions;

      createTypeNode({
        type: parsedContent,
        fileNode: node,
        createNode,
        createNodeId,
        createParentChildLink,
        createContentDigest,
      });
    } catch (e) {
      reporter.error(e);
    }
  }
}

exports.onCreateNode = onCreateNode;
