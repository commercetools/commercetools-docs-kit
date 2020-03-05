async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const validExtensions = ['application/javascript', 'text/x-java-source'];
  if (!validExtensions.includes(node.internal.mediaType)) return;

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

exports.onCreateNode = onCreateNode;
