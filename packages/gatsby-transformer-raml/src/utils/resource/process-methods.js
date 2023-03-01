const parametersToArray = require('../parameters-to-array');
const responsesToArray = require('./responses-to-array');
const headersToArray = require('./headers-to-array');
const codeExamplesToArray = require('./code-examples-to-array');
const examplesToArray = require('./examples-to-array').examplesToArray;
const resolveExampleFile = require('./examples-to-array').resolveExampleFile;
const sortProperties = require('../sort-properties');

function processMethods({
  resource,
  moveEndpointQueryParametersToTop,
  moveEndpointQueryParametersToBottom,
  fileNode,
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

      returnedMethods[method].headers = headersToArray(
        returnedMethods[method].headers
      );

      returnedMethods[method].codeExamples = codeExamplesToArray(
        returnedMethods[method].codeExamples
      );
      if (returnedMethods[method].responses) {
        returnedMethods[method].responses.forEach((response) => {
          if (response?.body?.applicationjson.examples) {
            response.body.applicationjson.examples = examplesToArray(
              response.body.applicationjson.examples,
              fileNode.dir,
              resolveExampleFile
            );
          }
        });
      }
    }
  });

  return returnedMethods;
}

module.exports = processMethods;
