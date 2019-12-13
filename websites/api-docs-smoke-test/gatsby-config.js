const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  pathPrefix: '/api-docs-smoke-test',
  siteMetadata: {
    title: 'API Docs Smoke Test',
    description: 'Documentation website for API smoke tests',
    betaLink: '',
  },
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-api-docs',
      options: {
        websiteKey: 'api-docs-smoke-test',
        excludeFromSearchIndex: isProd,
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
