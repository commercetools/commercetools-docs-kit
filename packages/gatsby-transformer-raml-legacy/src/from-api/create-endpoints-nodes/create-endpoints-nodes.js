const { postProcessEndpoints } = require('./post-process-endpoints.js');

const createEndpointsNodes = (
  resources,
  apiNode,
  { createNodeId, createContentDigest, createNode, createParentChildLink }
) => {
  if (resources) {
    const postProcessedResources = postProcessEndpoints(apiNode.key, resources);
    postProcessedResources.forEach((resource) => {
      const resourceNode = {
        ...resource,
        id: createNodeId(
          `${apiNode.id}.${apiNode.key}.${resource.uniqueId} >>> RAML_RESOURCE`
        ),
        children: [],
        parent: apiNode.id, // important!
        internal: {
          contentDigest: createContentDigest(resource),
          type: 'RamlResource',
        },
      };
      createNode(resourceNode);
      createParentChildLink({ parent: apiNode, child: resourceNode });
    });
  }
};

module.exports = {
  createEndpointsNodes,
};
