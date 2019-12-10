#!/usr/bin/env node

const url = require('url');
const path = require('path');
const express = require('express');
const blc = require('broken-link-checker');
const getPort = require('get-port');
const mri = require('mri');

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
    --excluded-keywords <name>   (optional) A comma-separated list of matching keywords to be excluded.
                                 See https://github.com/stevenvachon/broken-link-checker#excludedkeywords
  `);
  process.exit(0);
}

// configuration:
const sitePath = path.join(process.cwd(), siteFolder);
const checkerOptions = {
  // https://github.com/stevenvachon/broken-link-checker/tree/v0.7.x#blcsitecheckeroptions-handlers
  // https://github.com/stevenvachon/broken-link-checker/tree/v0.7.x#options
  excludedSchemes: ['data', 'geo', 'mailto', 'sms', 'tel'], // default: ["data","geo","javascript","mailto","sms","tel"]
  excludedkeywords: flags['excluded-keywords']
    ? flags['excluded-keywords'].split(',').map(keyword => keyword.trim())
    : [],
  filterLevel: 3, // as strict as possible
  honorRobotExclusions: false, // as strict as possible
};

getPort().then(port => {
  const app = express();
  app.get('/', (req, res) => {
    res.redirect(url.resolve('/', entryPoints[0]));
  });
  app.use('/', express.static(sitePath));
  const server = app.listen(port);
  server.on('listening', () => {
    let errorCount = 0;
    const siteChecker = new blc.SiteChecker(checkerOptions, {
      error: error => {
        console.log('An error occurred while link checking:');
        console.log(error);
        server.close(() => {
          process.exit(1);
        });
      },
      html: (/* tree, robots, response, pageUrl, customData */) => {},
      junk: (/* link, customData */) => {},
      link: (link /* , customData */) => {
        if (link.broken) {
          errorCount += 1;
          console.log(`${blc[link.brokenReason]} :  ${link.url.original}`);
          console.log(`   | used on: ${link.base.parsed.pathname}`);
        } else if (link.excluded) {
          console.log(`${blc[link.excludedReason]} : ${link.url.original}`);
          console.log(`   | used on: ${link.base.parsed.pathname}`);
        }
      },
      page: (/* error, pageUrl, customData */) => {},
      site: (/* error, siteUrl, customData */) => {},
      end: () => {
        console.log(
          `--- Link Check Finished With ${errorCount} Broken Links ---`
        );
        server.close(() => {
          if (errorCount > 0) process.exit(1);
          process.exit(0);
        });
      },
    });

    console.log('--- Starting Link Check Of Complete Site ---');

    entryPoints.forEach(entrypoint => {
      const localUrl = url.resolve(`http://localhost:${port}`, entrypoint);
      console.log(
        `- Link Checking ${path.join(siteFolder, entrypoint)} {${localUrl}} -`
      );
      siteChecker.enqueue(localUrl);
    });
  });
});
