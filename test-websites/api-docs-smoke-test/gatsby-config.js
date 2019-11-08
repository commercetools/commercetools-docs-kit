const path = require('path');

module.exports = {
  pathPrefix: '/api-docs-smoke-test',
  siteMetadata: {
    title: 'API Docs Smoke Test',
    shortTitle: 'API Docs Smoke Test',
    description: 'API Documentation Smoke Test Website',
    author: 'commercetools',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(`./src/api-specs`),
      },
    },
    '@commercetools-docs/gatsby-theme-docs',
    {
      resolve: '@commercetools-docs/gatsby-transformer-webapi',
      options: {
        validate: true,
        includeApis: ['test'],
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
  ],
};
