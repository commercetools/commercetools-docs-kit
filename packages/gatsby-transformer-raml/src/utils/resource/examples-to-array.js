const path = require('path');
const fs = require('fs');

function resolveExampleFile(fileNodeDir, filePath) {
  const exampleAbsolutePath = path.resolve(fileNodeDir, filePath);
  return fs.readFileSync(exampleAbsolutePath, 'utf8');
}

function examplesToArray(examples, fileNodeDir, resolveExampleFile) {
  if (examples) {
    return Object.entries(examples).map(([key, value]) => {
      const jsonString = resolveExampleFile(fileNodeDir, value.value);
      return { key, value: jsonString };
    });
  }

  return undefined;
}

module.exports = { examplesToArray, resolveExampleFile };
