#!/usr/bin/env node

const os = require('os');
const path = require('path');
const shelljs = require('shelljs');

const binaryFileName = os.platform() === 'win32' ? 'vale.exe' : 'vale';

const valeBinary = path.join(__dirname, `./${binaryFileName}`);
const valeConfig = path.join(__dirname, `../.vale.ini`);
const result = shelljs.exec(
  `${valeBinary} --config ${valeConfig} ${process.argv.slice(2).join(' ')}`
);
process.exit(result.code);
