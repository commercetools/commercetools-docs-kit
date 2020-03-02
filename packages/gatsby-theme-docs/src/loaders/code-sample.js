function codeSample(content) {
  this.cacheable();

  this.value = content;
  return `module.exports = ${JSON.stringify(content)}`;
}

module.exports = codeSample;
