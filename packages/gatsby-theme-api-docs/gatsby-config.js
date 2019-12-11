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
      options: {
        validate: true,
        includeApis: ['import', 'import-storage-api', 'test'],
        annotateConstantLikeEnums: true,
        annotateUnionLikeInheritance: true,
        customNumberScalars: true,
        flattenLibraryNamespaces: true,
        movePropertiesToTop: [
          'id',
          'version',
          'key',
          'createdAt',
          'createdBy',
          'lastModifiedAt',
          'lastModifiedBy',
        ],
        movePropertiesToBottom: ['custom'],
      },
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: themeOptions,
    },
  ],
});
