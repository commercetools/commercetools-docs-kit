module.exports = {
  pathPrefix: '/site-template',
  siteMetadata: {
    title: 'CHANGE-ME',
    description: 'CHANGE-ME',
    author: 'commercetools',
  },
  plugins: [
    {
      resolve: '@commercetools-docs/gatsby-theme-docs',
      options: {
        websiteName: 'CHANGE-ME',
        /* gaTrackingId: 'CHANGE-ME' */ // to enable trackign with Google Analytics, enter the site ID here
      },
    },
  ],
};
