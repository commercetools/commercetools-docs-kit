// gatsby-config.js
module.exports = {
  pathPrefix: `/training-slides`,
  plugins: [
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        // enable or disable gatsby-plugin-mdx
        // mdx: false,
        // source directory
        // contentPath: 'decks',
        // base path for routes generate by this theme
        // basePath: '/training-slides/',
      },
    },
  ],
};
