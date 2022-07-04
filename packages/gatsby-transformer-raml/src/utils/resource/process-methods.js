const parametersToArray = require('../parameters-to-array');
const responsesToArray = require('./responses-to-array');
const codeExamplesToArray = require('./code-examples-to-array');
const sortProperties = require('../sort-properties');

function processMethods({
  resource,
  moveEndpointQueryParametersToTop,
  moveEndpointQueryParametersToBottom,
}) {
  const returnedMethods = JSON.parse(JSON.stringify(resource));
  const methods = ['post', 'put', 'patch', 'get', 'head', 'delete'];

  methods.forEach((method) => {
    if (returnedMethods[method]) {
      returnedMethods[method].queryParameters = parametersToArray(
        returnedMethods[method].queryParameters
      );

      returnedMethods[method].queryParameters = returnedMethods[method]
        .queryParameters
        ? sortProperties({
            properties: returnedMethods[method].queryParameters,
            moveToTop: moveEndpointQueryParametersToTop,
            moveToBottom: moveEndpointQueryParametersToBottom,
          })
        : returnedMethods[method].queryParameters;

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
