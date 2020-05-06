/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const crypto = require('crypto');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = ['src/constants'];
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
      name: 'Constant',
      fields: {
        id: { type: 'ID!' },
        type: { type: 'String!' },
        name: { type: 'String!' },
        number: { type: 'Float' },
        text: { type: 'String' },
      },
      interfaces: ['Node'],
    })
  );
};

exports.onCreateNode = ({ node, getNode, actions, createNodeId }) => {
  const parent = getNode(node.parent);

  const isConstantsFile =
    node.internal.mediaType !== 'text/yaml' &&
    parent &&
    parent.sourceInstanceName === 'dataConstants';
  if (isConstantsFile) {
    const constantsData = {
      // The name of the file
      type: parent.name,
      name: node.name,
      number: node.number,
      text: node.text,
    };

    actions.createNode({
      ...constantsData,
      // Required fields
      id: createNodeId(`${node.id} >>> Constant`),
      parent: node.id,
      children: [],
      internal: {
        type: `Constant`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(constantsData))
          .digest(`hex`),
        content: JSON.stringify(constantsData),
        description: `Constant data`,
      },
    });
    actions.createParentChildLink({ parent, child: node });
  }
};
