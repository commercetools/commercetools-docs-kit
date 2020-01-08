const parametersToArray = require('./parameters-to-array');
const responsesToArray = require('./responses-to-array');

function processMethods(resource) {
  const returnedMethod = JSON.parse(JSON.stringify(resource));
  const methods = ['post', 'get', 'delete'];

  methods.forEach(method => {
    if (returnedMethod[method]) {
      returnedMethod[method].queryParameters = parametersToArray(
        returnedMethod[method].queryParameters
      );

      returnedMethod[method].responses = responsesToArray(
        returnedMethod[method].responses
      );

      returnedMethod[
        method
      ].absoluteUri = `${resource.baseUri}${resource.resourcePathUri}`;

      returnedMethod[method].allUriParameters = mergeParameters(
        resource.baseUriParameters,
        resource.uriParameters
      );
    }
  });

  return returnedMethod;
}

function mergeParameters(baseUriParameters, uriParameters) {
  let allUriParameters = [];

  if (baseUriParameters) {
    allUriParameters = allUriParameters.concat(baseUriParameters);
  }

  if (uriParameters) {
    allUriParameters = allUriParameters.concat(uriParameters);
  }

  return allUriParameters.length > 0 ? allUriParameters : undefined;
}

module.exports = processMethods;
