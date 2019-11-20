// unless we find a more explicit way to detect the phase (initial vs. incremental build),
// we rely on the last modification date to assume hot reload vs. initial load:
const wasNodeJustChanged = node => {
  if (node.ctimeMs && node.absolutePath) {
    const sinceLastChanged = Date.now() - node.ctimeMs;
    return sinceLastChanged < 1000; // times vary significantly, sometimes up to 600ms
  }
  return false;
};

const apiKeyForFileNode = node => {
  // Build a conventional unique key for the api from the file system structure.
  // This convention is needed because RAML does not allow to specify a unique own ID of an API.
  // Consider well whether to change this, many links in content will rely on it.
  const directoryKey = node.relativeDirectory.replace('/', '-');
  let apiKey;
  if (node.name === 'api') {
    apiKey = directoryKey;
  } else {
    apiKey = doIfNodeNameIsNotApi(node.name, directoryKey);
  }

  return apiKey.toLowerCase();
};

function doIfNodeNameIsNotApi(nodeName, directoryKey) {
  if (nodeName.startsWith(directoryKey)) {
    return nodeName;
  }
  return `${directoryKey}-${nodeName}`;
}

const includeApi = (node, includeApis) => {
  const apiKey = apiKeyForFileNode(node);
  if (!includeApis.includes(apiKey)) return false;
  return true;
};

module.exports = {
  wasNodeJustChanged,
  apiKeyForFileNode,
  includeApi,
};
