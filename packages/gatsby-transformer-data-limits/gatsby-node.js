/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type DataLimitsYaml implements Node @dontInfer {
      id: ID!
      name: String!
      number: Float
      text: String
    }
  `);
};
