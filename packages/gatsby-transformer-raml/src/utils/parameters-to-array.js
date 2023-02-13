const generateType = require('./type/generate-type');

function getTypes(typeUnion) {
  const typesList = typeUnion.split('|').map((item) => item.trim());
  const results = typesList.map((typeItem) => ({
    type: generateType({ type: typeItem }),
    builtinType: generateType({ type: typeItem }),
  }));
  return results;
}

function parametersToArray(parameters) {
  if (parameters) {
    return Object.entries(parameters).map(([key, parameter]) => {
      const paramType = generateType(parameter);
      const isUnionType = paramType === 'Union';
      return {
        ...parameter,
        name: key,
        type: paramType,
        unionParams: isUnionType ? getTypes(parameter.type) : [],
        builtinType: paramType,
      };
    });
  }

  return undefined;
}

module.exports = parametersToArray;
