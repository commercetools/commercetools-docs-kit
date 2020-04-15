const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';

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
        title: 'Docs Smoke Test',
        websiteKey: 'docs-smoke-test',
        excludeFromSearchIndex: isProd && !shouldEnableSearch,
        additionalPrismLanguages: ['scala', 'csharp'],
      },
    },
  ],
};
