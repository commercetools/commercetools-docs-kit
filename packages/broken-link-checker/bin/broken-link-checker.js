#!/usr/bin/env node

const url = require('url');
const path = require('path');
const express = require('express');
const getPort = require('get-port');
const mri = require('mri');
const run = require('../src/run');
const loadConfig = require('../src/load-config');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;
const [siteFolder, ...entryPoints] = commands;

if (flags.help || !(siteFolder && entryPoints.length > 0)) {
  console.log(`
  Usage: commercetools-broken-link-checker [siteFolder] [entryPoint entryPoint2 ...] [flags]

  Displays help information.

  [siteFolder]
    The path to the folder containing the static site.

  [entryPoints]
    A URL path to the entry points to be tested.

  Options:
    --excluded-keywords <name>    (optional) A comma-separated list of matching keywords to be excluded.
                                  See https://github.com/stevenvachon/broken-link-checker#excludedkeywords

  Alternatively options can be defined in a config file which are then passed to the underlying broken-link-checker.
  See https://www.npmjs.com/package/@commercetools-docs/broken-link-checker for the available config file formats.
  See https://github.com/stevenvachon/broken-link-checker#options for a complete list of options.
  `);
  process.exit(0);
}

const brokenLinkCheckerOptions = loadConfig();

// configuration:
const sitePath = path.join(process.cwd(), siteFolder);
const defaultCheckerOptions = {
  // https://github.com/stevenvachon/broken-link-checker/tree/v0.7.x#blcsitecheckeroptions-handlers
  // https://github.com/stevenvachon/broken-link-checker/tree/v0.7.x#options
  excludedSchemes: ['data', 'geo', 'mailto', 'sms', 'tel'], // default: ["data","geo","javascript","mailto","sms","tel"]
  filterLevel: 3, // as strict as possible
  honorRobotExclusions: false, // as strict as possible
};
const checkerOptionsFromCli = {
  excludedKeywords: flags['excluded-keywords']
    ? flags['excluded-keywords'].split(',').map(keyword => keyword.trim())
    : [],
};
const config = {
  entryPoints,
  siteFolder,
};

getPort().then(port => {
  const app = express();
  app.get('/', (req, res) => {
    res.redirect(url.resolve('/', entryPoints[0]));
  });
  app.use('/', express.static(sitePath));
  const server = app.listen(port);
  server.on('listening', () => {
    run({
      server,
      port,
      checkerOptions: {
        ...defaultCheckerOptions,
        ...brokenLinkCheckerOptions,
        ...checkerOptionsFromCli,
      },
      config,
    });
  });
});
