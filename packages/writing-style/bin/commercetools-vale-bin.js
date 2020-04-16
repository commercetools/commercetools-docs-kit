#!/usr/bin/env node

const run = require('../src/run');

const commandProcess = run(process.argv.slice(2));
commandProcess.on('close', (code) => {
  process.exit(code);
});
