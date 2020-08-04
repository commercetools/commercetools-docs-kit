const parametersToArray = require('../parameters-to-array');
const responsesToArray = require('./responses-to-array');

function examplesToArray(codeExamples) {
  if (codeExamples) {
    return Object.entries(codeExamples).map(([key, value]) => {
      return { language: key, value };
    });
  }
  return undefined;
}

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

      returnedMethods[method].codeExamples = examplesToArray(
        returnedMethods[method].codeExamples
      );
    }
  });

  return returnedMethods;
}

module.exports = processMethods;
