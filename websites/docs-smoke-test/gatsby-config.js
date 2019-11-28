module.exports = {
  pathPrefix: '/docs-smoke-test',
  siteMetadata: {
    title: 'Docs Smoke Test',
    description: 'Documentation website for smoke tests',
    betaLink: '/beta',
  },
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'docs-smoke-test',
        excludeFromSearchIndex: true,
      },
    },
  ],
};
