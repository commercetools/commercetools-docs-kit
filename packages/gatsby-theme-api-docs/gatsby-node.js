/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const loadablePlugin = require('@loadable/webpack-plugin');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = ['src/api-specs', 'src/data'];
  requiredDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type TypeLocationsYaml implements Node @dontInfer {
      id: ID!
      api: String!
      locations: [TypeLocationYamlLocations!]!
    }
    type TypeLocationYamlLocations {
      type: String!
      href: String!
    }
  `);
};

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.raml$/,
          type: 'json',
          use: [`yaml-loader`],
        },
      ],
    },
    plugins: [new loadablePlugin()],
  });
};
