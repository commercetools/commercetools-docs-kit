async function onCreateNode({ node }) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  console.log('begin type/endpoint node creation');
}
exports.onCreateNode = onCreateNode;
