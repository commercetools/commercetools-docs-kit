const computeType = require('../compute-type');

/**
 * This does a deep post processing needed on all fields on a resource
 */
function doRecursion(resource) {
  const returnedResource = {};

  Object.keys(resource).forEach(key => {
    // remove parenthesis from annotation identifier
    const keyWithoutParenthesis = key.replace(`(`, '').replace(`)`, '');

    if (computeType(resource[key]) === 'object') {
      returnedResource[keyWithoutParenthesis] = doRecursion(resource[key]);
      return;
    }

    returnedResource[keyWithoutParenthesis] = resource[key];
  });

  return returnedResource;
}

module.exports = doRecursion;
