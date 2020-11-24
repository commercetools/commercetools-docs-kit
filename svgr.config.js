/* eslint-disable global-require */
module.exports = {
  icon: true,
  svgoConfig: {
    plugins: [
      { removeViewBox: false },
      { prefixIds: true },
      // Keeps ID's of svgs so they can be targeted with CSS
      { cleanupIDs: false },
    ],
  },
  // same as the rollup plugin
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate: require('./svgr.index-template'),
};
