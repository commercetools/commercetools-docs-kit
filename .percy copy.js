module.exports = {
  version: 2,
  static: {
    include: [
      'docs-smoke-test/components/**/index.html',
      'docs-smoke-test/views/markdown/index.html',
      'docs-smoke-test/views/beta/index.html',
      'docs-smoke-test/releases/index.html',
      'api-docs-smoke-test/types/**/index.html',
      'api-docs-smoke-test/layouts/**/index.html',
      'api-docs-smoke-test/endpoints/**/index.html',
    ],
    exclude: ['site-template/*', 'documentation/*', 'index.html'],
    options: [
      {
        include: 'docs-smoke-test/components/rss-feeds/index.html',
        waitForSelector: 'table[data-table-name="rss-feed"]',
      },
      {
        include: 'docs-smoke-test/components/mermaid-diagram/index.html',
        waitForSelector: '#body-content svg.statediagram',
      },
      {
        include: 'docs-smoke-test/components/video-player/index.html',
        waitForSelector: '#body-content div#vjs_video_998',
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
