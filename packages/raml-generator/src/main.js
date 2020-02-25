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
    '../download/cli-application-1.0.0-20200221085820-all.jar'
  );

  // check if jar file was successfully downloaded.
  fs.access(jarFile, fs.constants.F_OK, err => {
    if (err) {
      console.error(`${jarFile} does not exist`, chalk.red.bold('ERROR'));

      // TODO: try download again, if failure, log error.
    }

    shell.exec(
      `java -jar ${jarFile} generate ${options.apiSpecPath} -o ./src/api-specs/${options.apiSpecName} -t ramldoc`
    );
  });
}

module.exports = { generateRaml };
