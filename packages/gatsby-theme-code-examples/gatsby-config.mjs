import path from 'path';

const config = {
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

export default config;
