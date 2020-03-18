const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'CodeExample',
      fields: {
        name: 'String!',
        extension: 'String!',
        absolutePath: 'String!',
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
      extension: node.extension,
      absolutePath: node.absolutePath,
      content,
    },
    createNodeId(`${node.id} >>> CodeExample`),
    'CodeExample'
  );
}

function isValidNode(node) {
  return (
    isValidMediaType(node.internal.mediaType) &&
    isValidSourceDirectory(node.dir)
  );
}

function isValidMediaType(mediaType) {
  // some files have no unique media type, see comments below
  const validMediaTypes = [
    'application/javascript',
    'text/x-java-source',
    'application/octet-stream', // csharp, graphql
    'application/json',
    'application/x-httpd-php',
    'application/x-sh',
    'video/mp2t', // typescript
    'text/yaml',
  ];

  return validMediaTypes.includes(mediaType);
}

function isValidSourceDirectory(dir) {
  const validDirectory = `${process.cwd()}/src/code-examples`;

  return dir.startsWith(validDirectory);
}

exports.createSchemaCustomization = createSchemaCustomization;
exports.onCreateNode = onCreateNode;
