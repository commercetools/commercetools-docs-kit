const includeGraph = require('./includeGraph');
const { apiKeyForFileNode } = require('./helpers');

// Remembering Api Nodes by File Path to later trigger updates on them
// gatsbyJS _seems_ to work with object identities internally so we need to remember the actual object.
// { "/path/to/api-file.raml": node }
const apiNodes = {};
const apiFileNodes = {};

const createApiNode = (
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
  api,
  fileNode
) => {
  const apiKey = apiKeyForFileNode(fileNode);
  const apiObj = buildApiObj(api, apiKey, fileNode);
  const apiNode = {
    ...apiObj,
    id: createNodeId(`${fileNode.id}.${apiKey} >>> RAML_API`),
    children: [],
    parent: fileNode.id,
    internal: {
      contentDigest: createContentDigest(apiObj),
      mediaType: fileNode.internal.mediaType,
      type: 'RamlApi',
    },
  };
  apiNodes[fileNode.absolutePath] = apiNode;
  apiFileNodes[fileNode.absolutePath] = fileNode;
  createNode(apiNode);
  createParentChildLink({ parent: fileNode, child: apiNode });
};

const reloadApisForInclude = (
  createNode,
  createParentChildLink,
  includedPath
) => {
  const apiPathsArray = includeGraph.includedByApis(includedPath);
  apiPathsArray.forEach((apiPath) => {
    if (apiNodes[apiPath]) {
      const apiNode = JSON.parse(JSON.stringify(apiNodes[apiPath]));
      delete apiNode.internal.owner;
      delete apiNode.children;
      delete apiNode.parent;
      apiNode.internal.contentDigest += `_forcedReloadAt:' ${new Date()
        .valueOf()
        .toString()}`;
      // console.log(' : recreate api node ' + apiNode.id +  ' at ' + apiNode.internal.contentDigest);
      createNode(apiNode);
      createParentChildLink({
        parent: apiFileNodes[apiPath],
        child: apiNode,
      });
    }
  });
};

// parser reference: https://raml-org.github.io/raml-js-parser-2/interfaces/_src_raml1_artifacts_raml10parserapi_.api.html
function buildApiObj(api, key, fileNode) {
  if (api == null) return null;
  const apiObj = {
    key,
    title: api.title(),
    baseUri: api.baseUri().value(),
    version: api.version(),
    description: api.description(),
    protocols: api.protocols(),
    absolutePath: fileNode.absolutePath,
    relativePath: fileNode.relativePath,
    relativeDirectory: fileNode.relativeDirectory,
    name: fileNode.name,
    extension: fileNode.extension,
  };
  return apiObj;
}

module.exports = {
  createApiNode,
  reloadApisForInclude,
};
