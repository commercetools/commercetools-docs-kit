const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { valeVersion } = require('../package.json');

const binaryFileName =
  os.platform() === 'win32' ? `vale-${valeVersion}.exe` : `vale-${valeVersion}`;

const valeBinary = path.join(__dirname, `../${binaryFileName}`);

function run(commandArgs) {
  return spawn(valeBinary, commandArgs, {
    stdio: 'inherit',
    windowsHide: true,
  });
}

module.exports = run;
