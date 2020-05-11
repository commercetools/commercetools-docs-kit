const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `codeExamples`,
        path: path.resolve('./src/code-examples'),
      },
    },
  ],
};
