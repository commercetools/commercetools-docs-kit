// some files have no unique media type, see comments below
const validMediaTypes = [
  'application/javascript',
  'text/x-java-source',
  'application/json',
  'application/x-httpd-php',
  'application/x-sh',
  'video/mp2t', // typescript represented as this because the .ts extension collides
  'text/yaml',
  'text/vnd.curl',
  'application/octet-stream', // languages without registered media type
  'text/plain', // more languages without registered media type
];
const examplesDirectory = `${process.cwd()}/src/code-examples`;

const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'CodeExample',
      fields: {
        name: 'String!',
        language: 'String!',
        path: 'String!',
        content: 'String!',
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),
  ];

  createTypes(typeDefs);
};

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  if (!isValidNode(node)) return;

  const { createNode, createParentChildLink } = actions;

  function transformObject(obj, id, type) {
    const codeSampleNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    };
    createNode(codeSampleNode);
    createParentChildLink({ parent: node, child: codeSampleNode });
  }

  const content = await loadNodeContent(node);

  transformObject(
    {
      name: node.name,
      language: node.extension,
      path: node.relativePath,
      content,
    },
    createNodeId(`${node.id} >>> CodeExample`),
    'CodeExample'
  );
}

function isValidNode(node) {
  return (
    validMediaTypes.includes(node.internal.mediaType) &&
    node.dir.startsWith(examplesDirectory)
  );
}

exports.createSchemaCustomization = createSchemaCustomization;
exports.onCreateNode = onCreateNode;
