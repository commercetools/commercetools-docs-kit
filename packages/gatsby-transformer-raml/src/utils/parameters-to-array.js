function parametersToArray(parameters) {
  if (parameters) {
    return Object.entries(parameters).map(([key, value]) => {
      return {
        ...value,
        name: key,

        // transforming number type to float is specific to commercetools
        type: value.type === 'number' ? 'float' : value.type,
        builtinType: value.type === 'number' ? 'float' : value.type,
      };
    });
  }

  return undefined;
}

module.exports = parametersToArray;
