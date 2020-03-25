#!/usr/bin/env node

const os = require('os');
const path = require('path');
const shelljs = require('shelljs');

const binaryFileName = os.platform() === 'win32' ? 'vale.exe' : 'vale';

const valeBinary = path.join(__dirname, `./${binaryFileName}`);
const valeConfig = path.join(__dirname, `../.vale.ini`);
let params = process.argv.slice(2);
// simplistic check whether the --config param was passed empty by the VSCode plugin (empty = followed by another flag)
const configParamPosition = params.findIndex((p) => p === '--config');
if (
  params[configParamPosition + 1] &&
  params[configParamPosition + 1].startsWith('-')
) {
  params = params.filter((p) => p !== '--config');
}

const command = `${valeBinary} --config ${valeConfig} ${params.join(' ')}`;
const result = shelljs.exec(command);
process.exit(result.code);
