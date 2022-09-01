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
    excludeFromSearchIndex: true,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'documentation',
      additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      addOns: ['@commercetools-docs/gatsby-theme-code-examples'],
    }),
    {
      resolve: '@commercetools-docs/gatsby-theme-sso-ui-kit',
      options: {
        auth0Domain: 'commercetools-professionals.eu.auth0.com',
        auth0ClientId: 'nZwQWPaoTq8IIk67VV8o0Ska9lGp4hnW',
      },
    },
  ],
};
