const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  pathPrefix: '/docs-smoke-test',
  siteMetadata: {
    title: 'Docs Smoke Test',
    description: 'Documentation website for smoke tests',
    betaLink: '/beta',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'docs-smoke-test',
      excludeFromSearchIndex: isProd && !shouldEnableSearch,
      additionalPrismLanguages: ['scala', 'csharp'],
      allowWideContentLayout: true,
      enableCanonicalUrls: true,
      addOns: [
        '@commercetools-docs/gatsby-theme-code-examples',
        '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
  ],
};
