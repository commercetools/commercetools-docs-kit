const firstline = require('firstline');
const jsYaml = require('js-yaml');
const createTypeNode = require('./src/create-type-node');
const createResourceNode = require('./src/create-resource-node');
const createApiNode = require('./src/create-api-node');
const createJsYamlSchema = require('./src/create-js-yaml-schema');
const defineSchema = require('./src/schema/define-schema');

const RAML_TYPE_FILE = '#%RAML 1.0 DataType';
const RAML_RESOURCE_FILE = '# Resource';
const RAML_API_FILE = '#%RAML 1.0';

const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  defineSchema({ schema, createTypes });
};

async function onCreateNode(
  {
    node,
    actions,
    createNodeId,
    createContentDigest,
    loadNodeContent,
    reporter,
  },
  {
    includeApis = [],
    movePropertiesToTop = [],
    movePropertiesToBottom = [],
  } = {}
) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  let ramlIndicator = await firstline(node.absolutePath);
  ramlIndicator = ramlIndicator.trim();
  const filesToParse = [RAML_TYPE_FILE, RAML_RESOURCE_FILE, RAML_API_FILE];

  if (filesToParse.includes(ramlIndicator.trim())) {
    // generate apiKey here to determine if api should be parsed at all or not
    let apiKey;

    if (
      ramlIndicator === RAML_TYPE_FILE ||
      ramlIndicator === RAML_RESOURCE_FILE
    ) {
      apiKey = node.relativeDirectory.substring(
        0,
        node.relativeDirectory.indexOf('/')
      );
    } else {
      apiKey = node.relativeDirectory;
    }

    if (!includeApis.includes(apiKey)) return;

    // continue parsing document
    const content = await loadNodeContent(node);
    const JSYAML_SCHEMA = createJsYamlSchema();

    try {
      const parsedContent = jsYaml.load(content, { schema: JSYAML_SCHEMA });

      const { createNode, createParentChildLink } = actions;

      if (ramlIndicator === RAML_TYPE_FILE) {
        createTypeNode({
          apiKey,
          type: parsedContent,
          fileNode: node,
          createNode,
          createNodeId,
          createParentChildLink,
          createContentDigest,
          movePropertiesToTop,
          movePropertiesToBottom,
        });
      } else if (ramlIndicator === RAML_RESOURCE_FILE) {
        createResourceNode({
          apiKey,
          resource: parsedContent,
          fileNode: node,
          createNode,
          createNodeId,
          createParentChildLink,
          createContentDigest,
        });
      } else {
        createApiNode({
          apiKey,
          api: parsedContent,
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

exports.createSchemaCustomization = createSchemaCustomization;
exports.onCreateNode = onCreateNode;
