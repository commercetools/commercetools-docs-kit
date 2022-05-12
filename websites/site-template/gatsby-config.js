const isProd = process.env.NODE_ENV === 'production';

const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/site-template',
  siteMetadata: {
    title: 'CHANGE-ME',
    description: 'CHANGE-ME',
    betaLink: '',
    excludeFromSearchIndex: isProd,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'CHANGE-ME',
      // additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      allowWideContentLayout: true,
      addOns: [
        // '@commercetools-docs/gatsby-theme-code-examples',
        // '@commercetools-docs/gatsby-theme-api-docs'
        // '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
  ],
};
