const doRecursion = require('./utils/resource/do-recursion');
const uriParametersToArray = require('./utils/resource/uri-parameters-to-array');
const responsesToArray = require('./utils/resource/responses-to-array');
const queryParametersToArray = require('./utils/resource/query-parameters-to-array');

function createResourceNode({
  resource,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
}) {
  const postProcessedResource = postProcessResource(resource, fileNode);

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

function postProcessResource(resource, fileNode) {
  const postProcessedResource = doRecursion(resource);

  postProcessedResource.apiKey = fileNode.relativeDirectory.replace(
    `/resources`,
    ''
  );

  postProcessedResource.uriParameters = uriParametersToArray(
    postProcessedResource.uriParameters
  );

  if (postProcessedResource.post) {
    postProcessedResource.post.queryParameters = queryParametersToArray(
      postProcessedResource.post.queryParameters
    );

    postProcessedResource.post.responses = responsesToArray(
      postProcessedResource.post.responses
    );
  }

  if (postProcessedResource.get) {
    postProcessedResource.get.queryParameters = queryParametersToArray(
      postProcessedResource.get.queryParameters
    );

    postProcessedResource.get.responses = responsesToArray(
      postProcessedResource.get.responses
    );
  }

  if (postProcessedResource.delete) {
    postProcessedResource.delete.queryParameters = queryParametersToArray(
      postProcessedResource.delete.queryParameters
    );

    postProcessedResource.delete.responses = responsesToArray(
      postProcessedResource.delete.responses
    );
  }

  return postProcessedResource;
}

module.exports = createResourceNode;
