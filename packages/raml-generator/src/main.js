const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

function generateRaml(options) {
  const resolvedPath = path.resolve(options.apiSpecPath);

  // Check if the spec file exists.
  fs.access(resolvedPath, fs.constants.F_OK, err => {
    if (err) {
      console.error(`${resolvedPath} does not exist`, chalk.red.bold('ERROR'));
      process.exit(1);
    }

    generateRamlIfSpecPath({ ...options, apiSpecPath: resolvedPath });
  });
}

function generateRamlIfSpecPath(options) {
  const jarFile = path.resolve(
    __dirname,
    '../jar/cli-application-1.0.0-20200221085820-all.jar'
  );

  shell.exec(
    `java -jar ${jarFile} generate ${options.apiSpecPath} -o ./src/api-specs/${options.apiSpecName} -t ramldoc`
  );
}

module.exports = { generateRaml };
