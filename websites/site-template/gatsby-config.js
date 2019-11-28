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
        excludeFromSearchIndex: true,

        // To enable tracking with Google Analytics, enter the site ID here
        // gaTrackingId: 'CHANGE-ME',
      },
    },
  ],
};
