const parametersToArray = require('../parameters-to-array');
const responsesToArray = require('./responses-to-array');
const codeExamplesToArray = require('./code-examples-to-array');

function processMethods(resource) {
  const returnedMethods = JSON.parse(JSON.stringify(resource));
  const methods = ['post', 'put', 'get', 'delete'];

  methods.forEach((method) => {
    if (returnedMethods[method]) {
      returnedMethods[method].queryParameters = parametersToArray(
        returnedMethods[method].queryParameters
      );

      returnedMethods[method].responses = responsesToArray(
        returnedMethods[method].responses
      );

      returnedMethods[method].codeExamples = codeExamplesToArray(
        returnedMethods[method].codeExamples
      );
    }
  });

  return returnedMethods;
}

module.exports = processMethods;
