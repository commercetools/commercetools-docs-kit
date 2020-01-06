function uriParametersToArray(uriParameters) {
  if (uriParameters) {
    return Object.entries(uriParameters).map(([key, value]) => {
      return { name: key, ...value };
    });
  }

  return undefined;
}

module.exports = uriParametersToArray;
