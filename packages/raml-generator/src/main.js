const shell = require('shelljs');

function generateRaml(options) {
  shell.exec(`echo options ${JSON.stringify(options)}`);
}

module.exports = { generateRaml };
