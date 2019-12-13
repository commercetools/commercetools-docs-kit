const firstline = require('firstline');

async function onCreateNode({ node }) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  const ramlIndicator = await firstline(node.absolutePath);

  if (ramlIndicator.trim() === '#%RAML 1.0') {
    console.log('parse as a yaml file');
  }
}
exports.onCreateNode = onCreateNode;
