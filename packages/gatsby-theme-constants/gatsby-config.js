const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dataConstants`,
        path: path.resolve('./src/constants'),
      },
    },
    // For querying configuration data
    'gatsby-transformer-yaml',
  ],
};
