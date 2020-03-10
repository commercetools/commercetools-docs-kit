const mri = require('mri');
const chalk = require('chalk');
const { generateRaml } = require('./main');

function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  promptForMissingOptions(options);

  try {
    generateRaml(options);
  } catch (e) {
    console.error(chalk.red.bold(e));
    process.exit(1);
  }
}

function parseArgumentsIntoOptions(rawArgs) {
  const argv = rawArgs.slice(2);

  const args = mri(argv, {
    alias: { help: ['h'] },
    default: { help: false, dest: './src/api-specs/' },
  });

  return {
    name: args.name,
    src: args.src,
    dest: args.dest,
  };
}

function promptForMissingOptions(options) {
  if (options.help || !(options.name && options.src)) {
    console.log(`
    Usage: commercetools-ramldoc-generator --name <api-spec-name> --src <api-spec-source-path>

    Options:
      --name <api-spec-name>                      The name of the generated spec file.

      --src <api-spec-source-path>                The path to the RAML file spec.

      --dest <api-spec-destination-path>          (optional) Alternative path for the generated RAML documents."
    `);

    process.exit(0);
  }
}

module.exports = { cli };
