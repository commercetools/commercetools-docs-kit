const path = require('path');
const { spawn } = require('child_process');
const { rmfCodegenVersion } = require('../package.json');

function run(args) {
  const jarFile = path.resolve(
    __dirname,
    `../bin/rmf-codegen.jar`
  );

  return spawn('java', ['-jar', jarFile, ...args], {
    stdio: 'inherit',
    windowsHide: true,
  });
}

module.exports = { run };
