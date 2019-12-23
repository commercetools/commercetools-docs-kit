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
    {
      resolve: '@commercetools-docs/gatsby-transformer-mdx-introspection',
      options: {
        lowercaseIdentifiers: true,
      },
    },
    {
      resolve: '@commercetools-docs/gatsby-transformer-raml',
      options: themeOptions.transformerRaml,
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: themeOptions,
    },
  ],
});
