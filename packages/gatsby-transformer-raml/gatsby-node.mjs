import firstline  from "firstline";
import jsYaml  from "js-yaml";
import createTypeNode  from "./src/create-type-node.mjs";
import createResourceNode  from "./src/create-resource-node.mjs";
import createApiNode  from "./src/create-api-node.mjs";
import JSYAML_SCHEMA  from "./src/create-js-yaml-schema.mjs";
import defineSchema  from "./src/schema/define-schema.mjs";







const RAML_TYPE_FILE = '#%RAML 1.0 DataType';
const RAML_RESOURCE_FILE = '# Resource';
const RAML_API_FILE = '#%RAML 1.0';

export const createSchemaCustomization  = ({ actions, schema }) => {
  const { createTypes } = actions;

  defineSchema({ schema, createTypes });
};

export async function  onCreateNode (
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
    moveTypePropertiesToTop = [],
    moveTypePropertiesToBottom = [],
    moveEndpointQueryParametersToTop = [],
    moveEndpointQueryParametersToBottom = [],
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
          moveTypePropertiesToTop,
          moveTypePropertiesToBottom,
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
          moveEndpointQueryParametersToTop,
          moveEndpointQueryParametersToBottom,
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



