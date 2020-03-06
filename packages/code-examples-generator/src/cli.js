const mri = require('mri');
const chalk = require('chalk');
const generateExamples = require('./generate-examples');

async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  promptForMissingOptions(options);

  try {
    await generateExamples(options);
  } catch (e) {
    console.error(chalk.red.bold(e.message));
    process.exit(1);
  }
}

function parseArgumentsIntoOptions(rawArgs) {
  const argv = rawArgs.slice(2);

  const args = mri(argv, {
    alias: { help: ['h'] },
    default: { help: false },
  });

  return {
    packageName: args.packagename,
  };
}

async function promptForMissingOptions(options) {
  if (options.help || !options.packageName) {
    console.log(`
    Usage: commercetools-code-examples-generator --packagename <package-name>

    Displays help information.

    Options:
      --dir <code-examples-directory>               (optional) the directory from which examples should be generated."
      `);

    process.exit(0);
  }
}

module.exports = { cli };
