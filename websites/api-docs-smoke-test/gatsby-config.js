const isProd = process.env.NODE_ENV === 'production';
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');
const colorPresets = require('@commercetools-docs/gatsby-theme-docs/color-presets');

module.exports = {
  pathPrefix: '/api-docs-smoke-test',
  siteMetadata: {
    title: 'API Docs Smoke Test',
    description: 'Documentation website for API smoke tests',
    betaLink: '',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'api-docs-smoke-test',
      colorPreset: colorPresets.platformDeveloperDocs.key,
      excludeFromSearchIndex: isProd,
      addOns: [
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
    }),
  ],
};
