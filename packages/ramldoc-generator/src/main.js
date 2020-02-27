const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

function generateRaml(options) {
  const resolvedSourcePath = path.resolve(options.apiSpecSourcePath);

  // Check if the spec file exists.
  if (!fs.existsSync(resolvedSourcePath)) {
    throw new Error(chalk.red.bold(`"${resolvedSourcePath}" does not exist`));
  }

  generateRamlIfSpecPath({
    ...options,
    apiSpecSourcePath: resolvedSourcePath,
  });
}

function generateRamlIfSpecPath(options) {
  const resolvedDestinationPath = path.resolve(options.apiSpecDestinationPath);

  console.log(
    `RAML docs will be generated in this directory: ${chalk.blue(
      resolvedDestinationPath
    )}`
  );

  const jarFile = path.resolve(__dirname, '../jar/rmf-codegen.jar');

  shell.exec(
    `java -jar ${jarFile} generate ${options.apiSpecSourcePath} -o ${resolvedDestinationPath}/${options.apiSpecName} -t ramldoc`
  );
}

module.exports = { generateRaml };
