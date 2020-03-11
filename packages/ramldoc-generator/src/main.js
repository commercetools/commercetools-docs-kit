const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const { rmfCodegenVersion } = require('../package.json');

function generateRaml(options) {
  const resolvedSourcePath = path.resolve(options.src);

  // Check if the spec file exists.
  if (!fs.existsSync(resolvedSourcePath)) {
    throw new Error(`"${resolvedSourcePath}" does not exist`);
  }

  generateRamlIfSpecPath({
    ...options,
    src: resolvedSourcePath,
  });
}

function generateRamlIfSpecPath(options) {
  const resolvedDestinationPath = path.resolve(options.dest);

  console.log(
    `RAML docs will be generated in this directory: ${chalk.blue(
      resolvedDestinationPath
    )}`
  );

  const jarFile = path.resolve(
    __dirname,
    `../bin/rmf-codegen-${rmfCodegenVersion}.jar`
  );

  shell.exec(
    `java -jar ${jarFile} generate ${options.src} -o ${resolvedDestinationPath}/${options.name} -t ramldoc`
  );
}

module.exports = { generateRaml };
