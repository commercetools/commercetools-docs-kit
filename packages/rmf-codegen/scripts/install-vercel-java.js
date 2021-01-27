const shelljs = require('shelljs');
const { javaIsInstalled, abortIfError } = require('./helpers');

if (!javaIsInstalled() && shelljs.which('amazon-linux-extras')) {
  console.info('Installing Java with amazon-linux-extras.');

  abortIfError(
    shelljs.exec('amazon-linux-extras install java-openjdk11', { silent: true })
  );
}
