const isProd = process.env.NODE_ENV === 'production';

module.exports = {
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
