const { cosmiconfigSync } = require('cosmiconfig');

const explorerSync = cosmiconfigSync('broken-link-checker');

module.exports = () => {
  const searchResult = explorerSync.search();
  const result = explorerSync.load(searchResult.filepath);

  if (result) {
    return result.config || {};
  }

  return {};
};
