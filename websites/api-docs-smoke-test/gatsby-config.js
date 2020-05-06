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
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'api-docs-smoke-test',
        websitePrimaryColor: 'goldenrod',
        excludeFromSearchIndex: isProd,
        themeAddOns: ['@commercetools-docs/gatsby-theme-api-docs'],
      },
    },
    {
      resolve: '@commercetools-docs/gatsby-theme-api-docs',
      options: {
        transformerRaml: {
          includeApis: ['test'],
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
