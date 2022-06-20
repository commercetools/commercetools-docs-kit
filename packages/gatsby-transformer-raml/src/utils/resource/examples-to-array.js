function examplesToArray(examples) {
  if (examples) {
    return Object.entries(examples).map(([key, value]) => {
      return { key, ...value };
    });
  }

  return undefined;
}

module.exports = examplesToArray;
