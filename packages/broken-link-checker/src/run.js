const url = require('url');
const path = require('path');
const blc = require('broken-link-checker');

const run = ({ server, port, config, checkerOptions }) => {
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

  config.entryPoints.forEach(entrypoint => {
    const localUrl = url.resolve(`http://localhost:${port}`, entrypoint);
    console.log(
      `- Link Checking ${path.join(
        config.siteFolder,
        entrypoint
      )} {${localUrl}} -`
    );
    siteChecker.enqueue(localUrl);
  });
};

module.exports = run;
