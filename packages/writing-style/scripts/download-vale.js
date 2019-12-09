const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

const version = '1.7.1';

const binaryFileName = (() => {
  switch (process.platform) {
    case 'darwin':
      return `vale_${version}_macOS_64-bit.tar.gz`;
    case 'linux':
      return `vale_${version}_Linux_64-bit.tar.gz`;
    case 'window':
      return `vale_${version}_Windows_64-bit.zip`;
    default:
      throw new Error(
        `Cannot download vale binary, unsupported platform: ${process.platform}.`
      );
  }
})();

const archivePath = path.join(__dirname, `../${binaryFileName}`);
const destPath = path.join(__dirname, '../bin');

console.log('[writing-styles] Verifying vale installation...');
if (fs.existsSync(path.join(destPath, 'vale'))) {
  console.log(
    '[writing-styles] Vale binary already installed, skipping installation...'
  );
} else {
  shelljs.exec(
    `curl -sLO https://github.com/errata-ai/vale/releases/download/v${version}/${binaryFileName}`
  );
  shelljs.exec(`tar -xzf ${archivePath} -C ${destPath} vale`);
  shelljs.rm('-rf', archivePath);
  console.log('[writing-styles] Vale binary installed.');
}
