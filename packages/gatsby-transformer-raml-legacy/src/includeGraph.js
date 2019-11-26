// a static object that holds what files have been loaded by what Api definition, e.g.:
// {
//   "/path/to/included/raml-fragment.raml" : [
//        "/path/to/api-that-included-it.raml",
//        "/path-to-another-api-that-included-it.raml"]
// }
const includedFilesForApiFiles = {};

const addIncludedFilesForApi = (filePathsIncluded, apiFilePath) => {
  filePathsIncluded.forEach(filePath => {
    if (filePath !== apiFilePath) {
      const hasFilePathProperty = Object.prototype.hasOwnProperty.call(
        includedFilesForApiFiles,
        filePath
      );
      if (hasFilePathProperty) {
        if (!includedFilesForApiFiles[filePath].includes(apiFilePath)) {
          includedFilesForApiFiles[filePath].push(apiFilePath);
        }
      } else {
        includedFilesForApiFiles[filePath] = new Array(apiFilePath);
      }
    }
  });
};

const isIncluded = includedPath => {
  const hasIncludedPathProperty = Object.prototype.hasOwnProperty.call(
    includedFilesForApiFiles,
    includedPath
  );
  return hasIncludedPathProperty;
};

const includedByApis = includedPath => {
  if (isIncluded(includedPath)) {
    return includedFilesForApiFiles[includedPath];
  }
  return [];
};

module.exports = {
  addIncludedFilesForApi,
  isIncluded,
  includedByApis,
};
