module.exports = {
  pathPrefix: '/docs-smoke-test',
  siteMetadata: {
    title: 'Docs Smoke Test',
    description: 'Documentation website for smoke tests',
    author: 'commercetools',
  },
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: { gaTrackingId: 'UA-38285631-3' },
    },
  ],
};
