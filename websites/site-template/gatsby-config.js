const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.30
  flags: {
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  pathPrefix: '/site-template',
  siteMetadata: {
    title: 'CHANGE-ME',
    description: 'CHANGE-ME',
    betaLink: '',
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
