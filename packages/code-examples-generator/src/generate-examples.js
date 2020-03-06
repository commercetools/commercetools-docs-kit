const { ncp } = require('ncp');
const shell = require('shelljs');
const chalk = require('chalk');

async function generateExamples(options) {
  const pathToModule = require.resolve(options.packageName);

  let sourcePath = pathToModule.substring(0, pathToModule.lastIndexOf('/'));
  let destPath = `${process.cwd()}/src/code-examples/${options.packageName}`;

  if (options.sourceDir) {
    sourcePath = `${sourcePath}/${options.sourceDir}`;
    destPath = `${destPath}/${options.sourceDir}`;
  }

  shell.exec(`mkdir -p ${destPath}`);

  ncp.limit = 16;

  // eslint-disable-next-line consistent-return
  ncp(sourcePath, destPath, err => {
    if (err) {
      console.log(chalk.red.bold('Error'));
      console.log(err);
      return;
    }

    console.log(
      chalk.green(`Successfully generated examples in "${destPath}"`)
    );
  });
}

module.exports = generateExamples;
