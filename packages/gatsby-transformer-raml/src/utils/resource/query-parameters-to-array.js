function queryParametersToArray(queryParameters) {
  if (queryParameters) {
    return Object.entries(queryParameters).map(([key, value]) => {
      return { name: key, ...value };
    });
  }

  return undefined;
}

module.exports = queryParametersToArray;
