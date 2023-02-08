const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  pathPrefix: '/learning-in-docs-test',
  siteMetadata: {
    title: 'Learning Tech Test',
    description: 'Smoke test for learning features in the docs kit',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'learning-in-docs-test',
      addOns: [
        {
          resolve: '@commercetools-docs/gatsby-theme-learning',
          options: {
            auth0Domain: process.env.GATSBY_AUTH0_DOMAIN,
            learnApiBaseUrl: process.env.GATSBY_LEARN_API_DOMAIN,
          },
        },
        {
          resolve: '@commercetools-docs/gatsby-theme-sso-ui-kit',
          options: {
            auth0Domain: process.env.GATSBY_AUTH0_DOMAIN,
            auth0ClientId: process.env.GATSBY_AUTH0_CLIENTID,
            learnApiBaseUrl: process.env.GATSBY_LEARN_API_DOMAIN,
          },
        },
      ],
    }),
  ],
};
