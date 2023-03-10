import path  from "path";

const config = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dataConstants`,
        path: path.resolve('./src/constants'),
      },
    },
    'gatsby-transformer-yaml',
  ],
};

export default config;
