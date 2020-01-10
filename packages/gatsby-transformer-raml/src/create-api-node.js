const doRecursion = require('./utils/api/do-recursion');
const parametersToArray = require('./utils/parameters-to-array');

function createApiNode({
  api,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
}) {
  const postProcessedApi = postProcessApi(api, fileNode);

  const apiNode = {
    ...postProcessedApi,
    id: createNodeId(`${fileNode.id} >>> RAML_API`),
    children: [],
    parent: fileNode.id,
    internal: {
      contentDigest: createContentDigest(postProcessedApi),
      mediaType: fileNode.internal.mediaType,
      type: 'RamlApi',
    },
  };

  createNode(apiNode);
  createParentChildLink({ parent: fileNode, child: apiNode });
}

function postProcessApi(api, fileNode) {
  const postProcessedApi = doRecursion(api);

  postProcessedApi.apiKey = fileNode.relativeDirectory;

  postProcessedApi.baseUriParameters = parametersToArray(
    postProcessedApi.baseUriParameters
  );

  return postProcessedApi;
}

module.exports = createApiNode;
