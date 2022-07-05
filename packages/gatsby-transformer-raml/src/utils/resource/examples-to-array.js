const path = require('path');
const fs = require('fs');

function examplesToArray(examples, fileNodeDir) {
  if (examples) {
    return Object.entries(examples).map(([key, value]) => {
      const exampleAbsolutePath = path.resolve(fileNodeDir, value.value);
      const jsonString = fs.readFileSync(exampleAbsolutePath, 'utf8');
      return { key, value: jsonString };
    });
  }

  return undefined;
}

module.exports = examplesToArray;
