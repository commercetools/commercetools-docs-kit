const doRecursion = require('./utils/api/do-recursion');
const parametersToArray = require('./utils/parameters-to-array');

function createApiNode({
  apiKey,
  api,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
}) {
  const postProcessedApi = postProcessApi({ apiKey, api });

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

function postProcessApi({ apiKey, api }) {
  const postProcessedApi = doRecursion(api);

  postProcessedApi.apiKey = apiKey;

  postProcessedApi.baseUriParameters = parametersToArray(
    postProcessedApi.baseUriParameters
  );

  return postProcessedApi;
}

module.exports = createApiNode;
