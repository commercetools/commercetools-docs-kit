/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');

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
    type EndpointLocationsYaml implements Node @dontInfer {
      id: ID!
      api: String!
      locations: [EndpointLocationYamlLocations!]!
    }
    type EndpointLocationYamlLocations {
      resource: String!
      method: String!
      href: String!
    }
  `);
};
