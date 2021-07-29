import generateType from './type/generate-type';

function parametersToArray(parameters) {
  if (parameters) {
    return Object.entries(parameters).map(([key, parameter]) => {
      return {
        ...parameter,
        name: key,

        type: generateType(parameter),
        builtinType: generateType(parameter),
      };
    });
  }

  return undefined;
}

module.exports = parametersToArray;
