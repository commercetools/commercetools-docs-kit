const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  pathPrefix: '/docs-smoke-test',
  siteMetadata: {
    title: 'Docs Smoke Test',
    description: 'Documentation website for smoke tests',
    betaLink: '/beta',
    excludeFromSearchIndex: isProd && !shouldEnableSearch,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'docs-smoke-test',
      additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      addOns: [
        '@commercetools-docs/gatsby-theme-code-examples',
        '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
    {
      resolve: '@commercetools-docs/gatsby-theme-sso-ui-kit',
      options: {
        auth0Domain: 'commercetools-professionals.eu.auth0.com',
        auth0ClientId: 'nZwQWPaoTq8IIk67VV8o0Ska9lGp4hnW',
      },
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-learning',
      options: {
        auth0Domain: 'commercetools-professionals.eu.auth0.com',
        learnApiDomain: 'https://api.learn.commercetools.com/',
      },
    },
  ],
};
