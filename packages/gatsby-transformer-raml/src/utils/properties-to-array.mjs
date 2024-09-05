import generateType from './type/generate-type.mjs';

function getTypes(typeUnion) {
  const typesList = typeUnion.split('|').map((item) => item.trim());
  const results = typesList.map((typeItem) => ({
    type: generateType({ type: typeItem }),
    builtinType: generateType({ type: typeItem }),
  }));
  return results;
}

function propertiesToArray(properties) {
  if (properties) {
    return Object.entries(properties).map(([key, parameter]) => {
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

export default propertiesToArray;
