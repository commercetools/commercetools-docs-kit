module.exports = {
  pathPrefix: '/import-api',
  siteMetadata: {
    title: 'Import API',
    description: 'Documentation for the commercetools Import API',
    betaLink: 'https://docs.commercetools.com/http-api-contract#beta-features',
  },
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-api-docs',
      options: {
        websiteKey: 'import-api',
        beta: true,
        excludeFromSearchIndex: true,
        gaTrackingId: 'UA-38285631-3',
        transformerRaml: {
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
    },
  ],
};
