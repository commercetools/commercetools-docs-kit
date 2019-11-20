#!/usr/bin/env node
/* eslint-disable no-console */
const express = require('express');
const blc = require('broken-link-checker');
const getPort = require('get-port');
const path = require('path');
const url = require('url');

if (process.argv.length < 4) {
  console.error(
    'Insufficient arguments: Pass the site path and at least one entrypoint inside the site path'
  );
  process.exit(1);
}

// configuration:
const relativeSitePath = process.argv[2];
const sitePath = path.join(process.cwd(), relativeSitePath);
const entrypoints = process.argv.slice(3);
const checkerOptions = {
  // https://github.com/stevenvachon/broken-link-checker/tree/v0.7.x#blcsitecheckeroptions-handlers
  // https://github.com/stevenvachon/broken-link-checker/tree/v0.7.x#options
  excludedSchemes: ['data', 'geo', 'mailto', 'sms', 'tel'], // default: ["data","geo","javascript","mailto","sms","tel"]
  filterLevel: 3, // as strict as possible
  honorRobotExclusions: false, // as strict as possible
};

getPort().then(port => {
  const app = express();
  app.get('/', (req, res) => {
    res.redirect(url.resolve('/', entrypoints[0]));
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

    entrypoints.forEach(entrypoint => {
      const localUrl = url.resolve(`http://localhost:${port}`, entrypoint);
      console.log(
        `- Link Checking ${path.join(
          relativeSitePath,
          entrypoint
        )} {${localUrl}} -`
      );
      siteChecker.enqueue(localUrl);
    });
  });
});
