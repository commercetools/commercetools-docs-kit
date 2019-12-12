const raml = require('raml-1-parser');
const firstline = require('firstline');
const {
  createApiNode,
  reloadApisForInclude,
} = require('./src/create-api-node');
const createNodesFromApi = require('./src/from-api/create-nodes');
const includeGraph = require('./src/includeGraph');
const { wasNodeJustChanged, includeApi } = require('./src/helpers');
const defineSchema = require('./src/schema/define-schema');

async function onCreateNode(
  { node, actions, createNodeId, createContentDigest },
  // Plugin options passed through `{ transformerRaml: {} }`
  {
    validate = false,
    canonicalTypeImpl = 'datatype-expansion',
    includeApis = [],
    annotateConstantLikeEnums = false,
    annotateUnionLikeInheritance = false,
    customNumberScalars = false,
    flattenLibraryNamespaces = false,
    movePropertiesToTop = [],
    movePropertiesToBottom = [],
  }
) {
  const { createNode, createParentChildLink } = actions;

  if (!['File', 'RamlApi'].includes(node.internal.type)) return;

  if (node.internal.type === 'RamlApi') {
    await createNodesFromApi(
      createNode,
      createNodeId,
      createParentChildLink,
      createContentDigest,
      node,
      {
        validate,
        canonicalTypeImpl,
        annotateConstantLikeEnums,
        annotateUnionLikeInheritance,
        customNumberScalars,
        flattenLibraryNamespaces,
        movePropertiesToTop,
        movePropertiesToBottom,
      }
    );
    return;
  }

  const nodeWasJustChanged = wasNodeJustChanged(node);
  if (nodeWasJustChanged && includeGraph.isIncluded(node.absolutePath)) {
    reloadApisForInclude(createNode, createParentChildLink, node.absolutePath);
    return;
  }

  if (node.internal.mediaType !== 'application/raml+yaml') return;

  // Only actual Apis, Overlays and Extensions reliably provide the effective type information. Ignore all others.
  // This is only a high-performance but superficial check that does not cover all cases.
  const ramlIndicator = await firstline(node.absolutePath);
  if (
    !['#%RAML 1.0', '#%RAML 1.0 Overlay', '#%RAML 1.0 Extension'].includes(
      ramlIndicator.trim()
    )
  )
    return;

  if (!includeApi(node, includeApis)) return;

  const api = await raml.loadApi(node.absolutePath);
  // A redundant but safer check:
  if (!['Api', 'Overlay', 'Extension'].includes(api.kind())) return;

  createApiNode(
    createNode,
    createNodeId,
    createParentChildLink,
    createContentDigest,
    api,
    node
  );
}

const sourceNodes = ({ actions, schema }) => {
  // Add type definitions to the GraphQL schema.
  const { createTypes } = actions;

  defineSchema({ schema, createTypes });
};

exports.sourceNodes = sourceNodes;
exports.onCreateNode = onCreateNode;
