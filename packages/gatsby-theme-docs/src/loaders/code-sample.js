function codeSample(content) {
  console.log(content);
  this.cacheable();

  this.value = content;
  return `module.exports = ${JSON.stringify(content)}`;
}

module.exports = codeSample;
