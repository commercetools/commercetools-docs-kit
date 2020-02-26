const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

function generateRaml(options) {
  const resolvedSourcePath = path.resolve(options.apiSpecSourcePath);

  // Check if the spec file exists.
  fs.access(resolvedSourcePath, fs.constants.F_OK, err => {
    if (err) {
      console.error(
        `${resolvedSourcePath} does not exist`,
        chalk.red.bold('ERROR')
      );
      process.exit(1);
    }

    generateRamlIfSpecPath({
      ...options,
      apiSpecSourcePath: resolvedSourcePath,
    });
  });
}

function generateRamlIfSpecPath(options) {
  const resolvedDestinationPath = path.resolve(options.apiSpecDestinationPath);

  const jarFile = path.resolve(
    __dirname,
    '../jar/cli-application-1.0.0-20200221085820-all.jar'
  );

  shell.exec(
    `java -jar ${jarFile} generate ${options.apiSpecSourcePath} -o ${resolvedDestinationPath}${options.apiSpecName} -t ramldoc`
  );
}

module.exports = { generateRaml };
