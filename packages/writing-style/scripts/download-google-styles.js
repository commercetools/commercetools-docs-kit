const path = require('path');
const shelljs = require('shelljs');

const archivePath = path.join(__dirname, '../Google.zip');
const destPath = path.join(__dirname, '../vale-styles');

shelljs.exec(
  'curl -sLO https://github.com/errata-ai/Google/releases/latest/download/Google.zip'
);
shelljs.exec(`tar -xzf ${archivePath} -C ${destPath}`);
shelljs.rm('-rf', archivePath);
