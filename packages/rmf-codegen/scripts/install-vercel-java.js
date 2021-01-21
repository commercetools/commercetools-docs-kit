const shelljs = require('shelljs');
const { javaIsInstalled, abortIfError } = require('./helpers');

if (!javaIsInstalled() && shelljs.which('amazon-linux-extras')) {
  console.info('Installing Java on Vercel.');

  abortIfError(
    shelljs.exec('amazon-linux-extras install java-openjdk11', { silent: true })
  );
}
