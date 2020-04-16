#!/usr/bin/env node

const path = require('path');
const run = require('../src/run');

const valeConfig = path.join(__dirname, `../.vale.ini`);

const commandProcess = run(['--config', valeConfig, ...process.argv.slice(2)]);
commandProcess.on('close', (code) => {
  process.exit(code);
});
