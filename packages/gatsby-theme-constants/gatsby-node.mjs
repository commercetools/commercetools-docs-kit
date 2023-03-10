import fs  from "fs";
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */



// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
export const onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = ['src/constants'];
  requiredDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

export const createSchemaCustomization = ({ actions, schema }) => {
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

export const onCreateNode = ({
  node,
  getNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const parent = getNode(node.parent);
  const isConstantsFile =
    parent &&
    parent.sourceInstanceName === 'dataConstants' &&
    parent.internal.mediaType === 'text/yaml';

  if (!isConstantsFile) {
    return;
  }

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
      contentDigest: createContentDigest(constantsData),
      content: JSON.stringify(constantsData),
      description: `Constant data`,
    },
  });
  actions.createParentChildLink({ parent, child: node });
};
