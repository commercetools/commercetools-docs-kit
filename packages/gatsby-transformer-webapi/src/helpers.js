const apiKeyForFileNode = node => {
  // Build a conventional unique key for the api from the file system structure.
  // This convention is needed because RAML does not allow to specify a unique own ID of an API.
  // Consider well whether to change this, many links in content will rely on it.
  const directoryKey = node.relativeDirectory.replace('/', '-');
  let apiKey;
  if (node.name === 'api') {
    apiKey = directoryKey;
  } else if (node.name.startsWith(directoryKey)) {
    apiKey = node.name;
  } else {
    apiKey = `${directoryKey}-${node.name}`;
  }
  return apiKey.toLowerCase();
};

const includeApi = (node, includeApis) => {
  const apiKey = apiKeyForFileNode(node);
  if (!includeApis.includes(apiKey)) return false;
  return true;
};

module.exports = {
  apiKeyForFileNode,
  includeApi,
};
