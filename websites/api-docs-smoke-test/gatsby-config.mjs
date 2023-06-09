import colorPresets from '@commercetools-docs/gatsby-theme-docs/color-presets/index.mjs';
import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  pathPrefix: '/api-docs-smoke-test',
  siteMetadata: {
    title: 'API Docs Smoke Test',
    description: 'Documentation website for API smoke tests',
    betaLink: '',
    excludeFromSearchIndex: isProd,
    globalNotification: {
      active: true,
      notificationType: 'info',
      content:
        'This is a global notification. You can _write_ **markdown** here! [Link to official website](https://docs.commercetools.com)',
    },
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'api-docs-smoke-test',
      additionalPrismLanguages: ['json', 'bash'],
      colorPreset: colorPresets.apiDeveloperDocs.key,
      addOns: [
        {
          resolve: '@commercetools-docs/gatsby-theme-api-docs',
          options: {
            transformerRaml: {
              includeApis: ['test', 'api'],
              moveTypePropertiesToTop: [
                'id',
                'version',
                'key',
                'createdAt',
                'createdBy',
                'lastModifiedAt',
                'lastModifiedBy',
              ],
              moveTypePropertiesToBottom: ['custom'],
              moveEndpointQueryParametersToTop: ['where', 'sort', 'limit'],
              moveEndpointQueryParametersToBottom: [
                'withTotal',
                'expand',
                '/^var[.][a-zA-Z0-9]+$/',
              ],
            },
          },
        },
      ],
    }),
  ],
};

export default config;
