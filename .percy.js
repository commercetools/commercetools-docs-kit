module.exports = {
  version: 2,
  static: {
    include: [
      /(.*)\/components\/(.*)\.html/,
      /(.*)\/endpoints\/(.*)\.html/,
      /(.*)\/layouts\/(.*)\.html/,
      /(.*)\/releases\/index\.html/,
      /(.*)\/types\/(.*)\.html/,
      /(.*)\/views\/markdown\/(.*)\.html/,
      /(.*)\/views\/beta\/(.*)\.html/,
    ],
    exclude: ['site-template/*'],
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
