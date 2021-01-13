const isProd = process.env.NODE_ENV === 'production';
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');
const colorPresets = require('@commercetools-docs/gatsby-theme-docs/color-presets');

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    DEV_SSR: true,
    FAST_REFRESH: true,
    PRESERVE_WEBPACK_CACHE: true,
  },
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
      allowWideContentLayout: true,
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
