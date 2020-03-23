const parametersToArray = require('../parameters-to-array');
const responsesToArray = require('./responses-to-array');

function processMethods(resource) {
  const returnedMethod = JSON.parse(JSON.stringify(resource));
  const methods = ['post', 'put', 'get', 'delete'];

  methods.forEach((method) => {
    if (returnedMethod[method]) {
      returnedMethod[method].queryParameters = parametersToArray(
        returnedMethod[method].queryParameters
      );

      returnedMethod[method].responses = responsesToArray(
        returnedMethod[method].responses
      );
    }
  });

  return returnedMethod;
}

module.exports = processMethods;
