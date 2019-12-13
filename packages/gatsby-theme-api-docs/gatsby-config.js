const path = require('path');

module.exports = (themeOptions = {}) => ({
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'generated-api-specs',
        path: path.resolve('./src/generated-api-specs'),
      },
    },
    '@commercetools-docs/gatsby-transformer-mdx-introspection',
    {
      resolve: '@commercetools-docs/gatsby-transformer-raml',
      options: {},
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: themeOptions,
    },
  ],
});
