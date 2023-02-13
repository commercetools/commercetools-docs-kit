const path = require('path');

module.exports = (themeOptions = {}) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'api-specs',
          path: path.resolve('./src/api-specs'),
        },
      },
      {
        resolve: '@commercetools-docs/gatsby-transformer-raml',
        options: themeOptions.transformerRaml,
      },
    ],
  };
};
