import propertiesToArray from '../properties-to-array.mjs';
import responsesToArray from './responses-to-array.mjs';
import headersToArray from './headers-to-array.mjs';
import codeExamplesToArray from './code-examples-to-array.mjs';
import { examplesToArray } from './examples-to-array.mjs';
import sortProperties from '../sort-properties.mjs';

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
      returnedMethods[method].queryParameters = propertiesToArray(
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

      returnedMethods[method].headers = headersToArray(
        returnedMethods[method].headers
      );

      returnedMethods[method].responses = responsesToArray(
        returnedMethods[method].responses
      );

      returnedMethods[method].codeExamples = codeExamplesToArray(
        returnedMethods[method].codeExamples
      );
      if (returnedMethods[method].responses) {
        returnedMethods[method].responses.forEach((response) => {
          if (response?.body) {
            Object.keys(response.body).forEach((key) => {
              if (response.body[key].examples) {
                response.body[key].examples = examplesToArray(
                  response.body[key].examples
                );
              }
            });
          }
        });
      }
    }
  });

  return returnedMethods;
}

export default processMethods;
