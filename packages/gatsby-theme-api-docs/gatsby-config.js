const path = require('path');

const getTagListOption = (themeOptions) => {
  if (!themeOptions.transformerMdx) return [];
  return (
    themeOptions.transformerMdx.tagList ||
    // backwards compatibility
    themeOptions.transformerMdx.tagWhitelist
  );
};

module.exports = (themeOptions = {}) => {
  // Extract the `tagList` from the theme options if specified
  const additionalTags = getTagListOption(themeOptions);
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
