const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
  },
  pathPrefix: '/documentation',
  siteMetadata: {
    title: 'Docs Kit Docs',
    description: '',
    betaLink: '/beta',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'documentation',
      excludeFromSearchIndex: true,
      additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      allowWideContentLayout: true,
      addOns: ['@commercetools-docs/gatsby-theme-code-examples'],
    }),
  ],
};
