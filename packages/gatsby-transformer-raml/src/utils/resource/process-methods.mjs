import parametersToArray  from "../parameters-to-array.mjs";
import responsesToArray  from "./responses-to-array.mjs";
import codeExamplesToArray  from "./code-examples-to-array.mjs";
import _toesmTemp4  from "./examples-to-array.mjs";
import _toesmTemp3  from "./examples-to-array.mjs";
import sortProperties  from "../sort-properties.mjs";



const examplesToArray  = _toesmTemp4.examplesToArray;


const resolveExampleFile  = _toesmTemp3.resolveExampleFile;



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

export default processMethods;
