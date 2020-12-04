const path = require('path');
const { spawn } = require('child_process');
const os = require('os');
const { rmfCodegenVersion } = require('../package.json');

function run(args) {
  if (os.platform() === 'linux') {
    return runWithLinux(args);
  }

  return runWithJar(args);
}

function runWithLinux(/* args */) {
  // const linuxFile = path.resolve(
  //   __dirname,
  //   `../bin/rmf-codegen-${rmfCodegenVersion}.linux`
  // );

  return 'todo: figure out how to run with linux binary';

  // return spawn('java', ['-jar', linuxFile, ...args], {
  //   stdio: 'inherit',
  //   windowsHide: true,
  // });
}

function runWithJar(args) {
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
