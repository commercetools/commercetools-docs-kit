#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

const valeBinary = path.join(__dirname, `./vale`);
const valeConfig = path.join(__dirname, `../.vale.ini`);
const result = spawnSync(
  valeBinary,
  ['--config', valeConfig, ...process.argv.slice(2)],
  {
    windowsHide: true,
    stdio: 'inherit',
  }
);
process.exit(result.status);
