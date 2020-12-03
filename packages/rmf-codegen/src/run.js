const path = require('path');
const { spawn } = require('child_process');
const os = require('os');
const { rmfCodegenVersion } = require('../package.json');

function run(args) {
  if (os.platform() === 'linux') {
    console.log('use linux binary');
    return 'linux';
  }

  const jarFile = path.resolve(
    __dirname,
    `../bin/rmf-codegen-${rmfCodegenVersion}.jar`
  );

  return spawn('java', ['-jar', jarFile, ...args], {
    stdio: 'inherit',
    windowsHide: true,
  });
}

module.exports = { run };
