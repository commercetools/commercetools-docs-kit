import computeType  from "../compute-type.mjs";

const fieldsToClean = {
  '(builtinType)': true,
};

function doRecursion(api) {
  const returnedApi = {};

  Object.keys(api).forEach((key) => {
    // remove all non alphanumeric characters except underscores
    const alphanumericKey = fieldsToClean[key] ? key.replace(/\W/g, '') : key;

    if (computeType(api[key]) === 'object') {
      returnedApi[alphanumericKey] = doRecursion(api[key]);
      return;
    }

    returnedApi[alphanumericKey] = api[key];
  });

  return returnedApi;
}

export default doRecursion;
