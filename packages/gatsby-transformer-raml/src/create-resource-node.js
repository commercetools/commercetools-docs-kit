const doRecursion = require('./utils/resource/do-recursion');
const parametersToArray = require('./utils/parameters-to-array');
const processMethods = require('./utils/resource/process-methods');

function createResourceNode({
  apiKey,
  resource,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
  moveEndpointQueryParametersToTop,
  moveEndpointQueryParametersToBottom,
}) {
  const postProcessedResource = postProcessResource({
    apiKey,
    resource,
    fileNode,
    moveEndpointQueryParametersToTop,
    moveEndpointQueryParametersToBottom,
  });

  const resourceNode = {
    ...postProcessedResource,
    id: createNodeId(`${fileNode.id} >>> RAML_RESOURCE`),
    children: [],
    parent: fileNode.id,
    internal: {
      contentDigest: createContentDigest(postProcessedResource),
      mediaType: fileNode.internal.mediaType,
      type: 'RamlResource',
    },
  };

  createNode(resourceNode);
  createParentChildLink({ parent: fileNode, child: resourceNode });
}

function postProcessResource({
  apiKey,
  resource,
  fileNode,
  moveEndpointQueryParametersToTop,
  moveEndpointQueryParametersToBottom,
}) {
  let postProcessedResource = doRecursion(resource);

  postProcessedResource.apiKey = apiKey;

  postProcessedResource.uriParameters = parametersToArray(
    postProcessedResource.uriParameters
  );

  postProcessedResource.baseUriParameters = parametersToArray(
    postProcessedResource.baseUriParameters
  );

  postProcessedResource = processMethods({
    resource: postProcessedResource,
    moveEndpointQueryParametersToTop,
    moveEndpointQueryParametersToBottom,
    fileNode,
  });

  return postProcessedResource;
}

module.exports = createResourceNode;
