const isProd = process.env.NODE_ENV === 'production';

const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/site-template',
  siteMetadata: {
    title: 'CHANGE-ME',
    description: 'CHANGE-ME',
    betaLink: '',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'CHANGE-ME',
      excludeFromSearchIndex: isProd,
      // additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      allowWideContentLayout: true,
      addOns: [
        // '@commercetools-docs/gatsby-theme-code-examples',
        // '@commercetools-docs/gatsby-theme-api-docs'
        // '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
  ],
};

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
  },

  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'CHANGE-ME',
        excludeFromSearchIndex: isProd,

        // To enable tracking with Google Analytics, enter the site ID here
        // gaTrackingId: 'CHANGE-ME',
      },
    },
  ],
};
