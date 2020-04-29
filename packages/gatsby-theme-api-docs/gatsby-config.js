const path = require('path');

module.exports = (themeOptions = {}) => {
  // Extract tagWhitelist from theme options if specified
  const additionalTags =
    themeOptions.transformerMdx && themeOptions.transformerMdx.tagWhitelist
      ? themeOptions.transformerMdx.tagWhitelist
      : [];
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
        resolve: '@commercetools-docs/gatsby-transformer-mdx-introspection',
        options: {
          ...themeOptions.transformerMdx,
          tagWhitelist: ['ApiType', 'ApiEndpoint', ...additionalTags],
        },
      },
      {
        resolve: '@commercetools-docs/gatsby-transformer-raml',
        options: themeOptions.transformerRaml,
      },
    ],
  };
};
