#!/usr/bin/env node
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { valeVersion } = require('../package.json');

const binaryFileName =
  os.platform() === 'win32' ? `vale-${valeVersion}.exe` : `vale-${valeVersion}`;

const valeBinary = path.join(__dirname, `./${binaryFileName}`);

const valeProc = spawn(valeBinary, process.argv.slice(2), {
  stdio: 'inherit',
  windowsHide: true,
});
valeProc.on('close', (code) => {
  process.exit(code);
});
