const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
  },
  pathPrefix: '/documentation',
  siteMetadata: {
    title: 'Documentation',
    description: '',
    betaLink: '',
  },
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteKey: 'documentation',
        excludeFromSearchIndex: isProd,

        // To enable tracking with Google Analytics, enter the site ID here
        // gaTrackingId: 'CHANGE-ME',
      },
    },
  ],
};
