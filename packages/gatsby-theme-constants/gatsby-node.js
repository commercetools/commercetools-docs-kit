/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');

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

// exports.onCreateNode = ({ node, getNode, actions, createNodeId }) => {
//   if (node.internal.type !== 'Mdx') {
//     return;
//   }

//   const parent = getNode(node.parent);

//   const isCardFragment =
//     parent.internal.mediaType === 'text/mdx' &&
//     parent.sourceInstanceName === 'cards';
//   if (isCardFragment) {
//     const cardFieldData = {
//       type: node.frontmatter.type,
//       title: node.frontmatter.title,
//       link: node.frontmatter.link,
//       linkLabel: node.frontmatter.linkLabel,
//       image: node.frontmatter.image,
//       icon: node.frontmatter.icon,
//     };

//     actions.createNode({
//       ...cardFieldData,
//       // Required fields
//       id: createNodeId(`${node.id} >>> Card`),
//       parent: node.id,
//       children: [],
//       internal: {
//         type: `Card`,
//         contentDigest: crypto
//           .createHash(`md5`)
//           .update(JSON.stringify(cardFieldData))
//           .digest(`hex`),
//         content: JSON.stringify(cardFieldData),
//         description: `Card fragment`,
//       },
//     });
//     actions.createParentChildLink({ parent, child: node });
//   }
// };
