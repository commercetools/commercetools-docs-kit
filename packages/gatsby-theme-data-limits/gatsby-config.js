const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dataLimits`,
        path: path.resolve('./src/data'),
      },
    },
    // For querying configuration data
    'gatsby-transformer-yaml',
  ],
};
