const shelljs = require('shelljs');
const { javaIsInstalled, abortIfError } = require('./helpers');

console.info('Installing Java on Vercel.');

if (!javaIsInstalled() && shelljs.which('amazon-linux-extras')) {
  abortIfError(
    shelljs.exec('amazon-linux-extras install java-openjdk11', { silent: true })
  );
}
