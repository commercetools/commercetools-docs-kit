const shelljs = require('shelljs');

const javaIsInstalled = () => {
  try {
    const result = shelljs.exec('java -version', { silent: true });
    return result.code === 0;
  } catch (error) {
    return false;
  }
};

const abortIfError = (result) => {
  if (result.code > 0) {
    throw new Error(result.stderr);
  }
};

module.exports = { javaIsInstalled, abortIfError };
