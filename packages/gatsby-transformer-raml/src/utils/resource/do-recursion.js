const computeType = require('../compute-type');

const fieldsToClean = {
  '(resourceName)': true,
  '(resourcePathUri)': true,
  '(builtinType)': true,
  'application/json': true,
  'application/x-www-form-urlencoded': true,
  'image/jpeg': true,
  'image/png': true,
  'image/gif': true,
  '(codeExamples)': true,
};

/**
 * This does a deep post processing needed on all fields on a resource
 */
function doRecursion(resource) {
  const returnedResource = {};

  Object.keys(resource).forEach((key) => {
    // remove all non alphanumeric characters except underscores
    const alphanumericKey = fieldsToClean[key] ? key.replace(/\W/g, '') : key;

    if (computeType(resource[key]) === 'object') {
      returnedResource[alphanumericKey] = doRecursion(resource[key]);
      return;
    }

    returnedResource[alphanumericKey] = resource[key];
  });

  return returnedResource;
}

module.exports = doRecursion;
