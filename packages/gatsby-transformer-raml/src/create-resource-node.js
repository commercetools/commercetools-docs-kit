const doRecursion = require('./utils/resource/do-recursion');
const uriParametersToArray = require('./utils/resource/uri-parameters-to-array');
const responsesToArray = require('./utils/resource/responses-to-array');

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
    postProcessedResource.post.responses = responsesToArray(
      postProcessedResource.post.responses
    );
  }

  return postProcessedResource;
}

module.exports = createResourceNode;
