/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = ['src/api-specs', 'src/type-locations'];
  requiredDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(
    schema.buildObjectType({
      name: 'TypeLocations',
      fields: {
        path: { type: 'String!' },
      },
      interfaces: ['Node'],
    })
  );
};

exports.onCreateNode = ({
  node,
  getNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const parent = getNode(node.parent);
  const isTypeLocationsFile =
    parent &&
    parent.sourceInstanceName === 'dataTypeLocations' &&
    parent.internal.mediaType === 'text/yaml';

  if (!isTypeLocationsFile) {
    return;
  }

  const typeLocationData = {
    // The name of the file
    path: node.path,
  };

  actions.createNode({
    ...typeLocationData,
    // Required fields
    id: createNodeId(`${node.id} >>> Type location`),
    parent: node.id,
    children: [],
    internal: {
      type: `Type location`,
      contentDigest: createContentDigest(typeLocationData),
      content: JSON.stringify(typeLocationData),
      description: `Type location data`,
    },
  });
  actions.createParentChildLink({ parent, child: node });
};
