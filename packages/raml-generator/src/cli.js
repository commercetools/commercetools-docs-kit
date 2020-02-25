/** Based on this blog - https://www.twilio.com/blog/how-to-build-a-cli-with-node-js */
const arg = require('arg');
const inquirer = require('inquirer');
const { generateRaml } = require('./main');

async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  generateRaml(options);
}

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {},
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    apiSpecName: args._[0],
    apiSpecPath: args._[1],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.apiSpecName) {
    questions.push({
      type: 'input',
      name: 'apiSpecName',
      message: 'What is the name of the spec?',
    });
  }

  if (!options.apiSpecPath) {
    questions.push({
      type: 'input',
      name: 'apiSpecPath',
      message: 'What is the path to the spec?',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    apiSpecName: options.apiSpecName || answers.apiSpecName,
    apiSpecPath: options.apiSpecPath || answers.apiSpecPath,
  };
}

module.exports = { cli };
