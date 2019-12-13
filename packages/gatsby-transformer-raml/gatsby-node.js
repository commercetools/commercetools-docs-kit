const firstline = require('firstline');
const wap = require('webapi-parser').WebApiParser;

async function onCreateNode({ node }) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  const ramlIndicator = await firstline(node.absolutePath);

  if (ramlIndicator.trim() === '#%RAML 1.0') {
    const model = await wap.raml10.parse(`file://${node.absolutePath}`);
    const api = model.encodes;

    console.log('Title:', api.name.value());
  }
}
exports.onCreateNode = onCreateNode;
