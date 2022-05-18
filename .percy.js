module.exports = {
  version: 2,
  static: {
    include: [
      /(.*-smoke-test.*)\/components\/(.*)\.html/,
      /(.*-smoke-test.*)\/endpoints\/(.*)\.html/,
      /(.*-smoke-test.*)\/layouts\/(.*)\.html/,
      /(.*-smoke-test.*)\/releases\/index\.html/,
      /(.*-smoke-test.*)\/types\/(.*)\.html/,
      /(.*-smoke-test.*)\/views\/markdown\/(.*)\.html/,
      /(.*-smoke-test.*)\/views\/beta\/(.*)\.html/,
    ],
    exclude: ['site-template/*'],
    overrides: [
      {
        include: /(.*-smoke-test.*)\/components\/rss-feeds\/index\.html/,
        waitForSelector: 'table[data-table-name="rss-feed"]',
      },
      {
        include: /(.*-smoke-test.*)\/components\/mermaid-diagram\/index\.html/,
        waitForTimeout: 2000,
      },
    ],
  },
  snapshot: {
    widths: [1706],
    minHeight: 1024,
    percyCSS: `#application { height: auto; }`,
  },
  discovery: {
    // ms (https://docs.percy.io/docs/command-line-client#section--network-idle-timeout-t)
    networkIdleTimeout: 750,
  },
};
