const firstline = require('firstline');
const jsYaml = require('js-yaml');

async function onCreateNode({ node, loadNodeContent, reporter }) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  const ramlIndicator = await firstline(node.absolutePath);

  if (ramlIndicator.trim() === '#%RAML 1.0') {
    const content = await loadNodeContent(node);
    const JSYAML_SCHEMA = createJsYamlSchema();

    try {
      const parsedContent = jsYaml.load(content, { schema: JSYAML_SCHEMA });
      const apiKey = apiKeyForFileNode(node);

      createTypeNodes({
        apiKey,
        nodeAbsolutePath: node.absolutePath,
        types: parsedContent.types,
      });
    } catch (e) {
      reporter.error(e);
    }
  }
}

function createJsYamlSchema() {
  /**
   * Without definition of custom types, js-yaml throws an error when
   * it hits tags like "!include".
   *
   * See here for more info on how to write custom types for js-yaml
   * https://github.com/nodeca/js-yaml/wiki/Custom-types
   */
  const IncludeYamlType = new jsYaml.Type('!include', {
    kind: 'scalar',
    construct: data => {
      return data !== null ? data : '';
    },
  });

  return jsYaml.Schema.create([IncludeYamlType]);
}

function apiKeyForFileNode(node) {
  // Build a conventional unique key for the api from the file system structure.
  // This convention is needed because RAML does not allow to specify a unique own ID of an API.
  // Consider well whether to change this, many links in content will rely on it.
  const directoryKey = node.relativeDirectory.replace('/', '-');
  let apiKey;
  if (node.name === 'api') {
    apiKey = directoryKey;
  } else if (node.name.startsWith(directoryKey)) {
    apiKey = node.name;
  } else {
    apiKey = `${directoryKey}-${node.name}`;
  }
  return apiKey.toLowerCase();
}

function createTypeNodes({ apiKey, nodeAbsolutePath, types }) {
  const typePathsArray = Object.values(types);
  typePathsArray.forEach(path => {
    const last = nodeAbsolutePath.lastIndexOf('/');
    const prefix = nodeAbsolutePath.substring(0, last + 1);
    const typeAbsolutePath = `${prefix}${path}`;
    console.log(apiKey, typeAbsolutePath);
  });
}

exports.onCreateNode = onCreateNode;
