const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    DEV_SSR: true,
    FAST_REFRESH: true,
    PRESERVE_WEBPACK_CACHE: true,
  },
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
      addOns: [
        '@commercetools-docs/gatsby-theme-code-examples',
        '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
  ],
};
