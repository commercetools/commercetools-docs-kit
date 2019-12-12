const path = require('path');

module.exports = (themeOptions = {}) => ({
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'api-specs',
        path: path.resolve('./src/api-specs'),
      },
    },
    '@commercetools-docs/gatsby-transformer-mdx-introspection',
    {
      resolve: '@commercetools-docs/gatsby-transformer-raml-legacy',
      options: themeOptions.transformerRaml,
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: themeOptions,
    },
  ],
});
