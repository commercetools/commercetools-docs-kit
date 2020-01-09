const doRecursion = require('./utils/resource/do-recursion');
const parametersToArray = require('./utils/resource/parameters-to-array');
const processMethods = require('./utils/resource/process-methods');

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
  let postProcessedResource = doRecursion(resource);

  postProcessedResource.apiKey = fileNode.relativeDirectory.replace(
    `/resources`,
    ''
  );

  postProcessedResource.uriParameters = parametersToArray(
    postProcessedResource.uriParameters
  );

  postProcessedResource.baseUriParameters = parametersToArray(
    postProcessedResource.baseUriParameters
  );

  postProcessedResource = processMethods(postProcessedResource);

  return postProcessedResource;
}

module.exports = createResourceNode;
