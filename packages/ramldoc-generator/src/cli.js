const mri = require('mri');
const { generateRaml } = require('./main');

async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  promptForMissingOptions(options);

  try {
    await generateRaml(options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function parseArgumentsIntoOptions(rawArgs) {
  const argv = rawArgs.slice(2);

  const args = mri(argv, {
    alias: { help: ['h'] },
    default: { help: false, name: '', src: '', dest: './src/api-specs/' },
  });

  return {
    name: args.name,
    src: args.src,
    dest: args.dest,
  };
}

async function promptForMissingOptions(options) {
  if (options.help || !(options.name && options.src)) {
    console.log(`
    Usage: commercetools-ramldoc-generator --name <api-spec-name> --src <api-spec-source-path>

    Options:
      --dest <api-spec-destination-path>               (optional) alternative path for the generated RAML documents."
    `);

    process.exit(0);
  }
}

module.exports = { cli };
