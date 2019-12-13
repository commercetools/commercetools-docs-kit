const firstline = require('firstline');
const jsYaml = require('js-yaml');

async function onCreateNode({ node, loadNodeContent }) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  const ramlIndicator = await firstline(node.absolutePath);

  if (ramlIndicator.trim() === '#%RAML 1.0') {
    const content = await loadNodeContent(node);
    const JSYAML_SCHEMA = createJsYamlSchema();

    try {
      const parsedContent = jsYaml.load(content, { schema: JSYAML_SCHEMA });
      console.log(parsedContent);
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * Without definition of custom types, js-yaml throws an error when
 * it hits tags like "!include".
 *
 * See here for more info on how to write custom types for js-yaml
 * https://github.com/nodeca/js-yaml/wiki/Custom-types
 */
function createJsYamlSchema() {
  const IncludeYamlType = new jsYaml.Type('!include', {
    kind: 'scalar',
    construct: data => {
      return data !== null ? data : '';
    },
  });

  return jsYaml.Schema.create([IncludeYamlType]);
}
exports.onCreateNode = onCreateNode;
