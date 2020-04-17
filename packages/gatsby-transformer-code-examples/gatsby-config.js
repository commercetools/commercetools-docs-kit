const path = require('path');

module.exports = () => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'codeExamples',
          path: path.resolve(`./src/code-examples`),
        },
      },
    ],
  };
};
