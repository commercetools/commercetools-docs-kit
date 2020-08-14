function codeExamplesToArray(codeExamples) {
  if (codeExamples) {
    return Object.entries(codeExamples).map(([key, value]) => {
      return { language: key, value };
    });
  }

  return undefined;
}

module.exports = codeExamplesToArray;
