const firstline = require('firstline');
const jsYaml = require('js-yaml');

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
  loadNodeContent,
  reporter,
}) {
  if (!['File'].includes(node.internal.type)) return;
  if (node.internal.mediaType !== 'application/raml+yaml') return;

  const ramlIndicator = await firstline(node.absolutePath);

  if (ramlIndicator.trim() === '#%RAML 1.0 DataType') {
    const content = await loadNodeContent(node);
    const JSYAML_SCHEMA = createJsYamlSchema();

    try {
      const parsedContent = jsYaml.load(content, { schema: JSYAML_SCHEMA });

      const { createNode, createParentChildLink } = actions;

      createTypeNode({
        type: parsedContent,
        fileNode: node,
        createNode,
        createNodeId,
        createParentChildLink,
        createContentDigest,
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

function createTypeNode({
  type,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
}) {
  const typeNode = {
    ...type,
    id: createNodeId(`${fileNode.id} >>> RAML_TYPE`),
    children: [],
    parent: fileNode.id,
    internal: {
      contentDigest: createContentDigest(type),
      mediaType: fileNode.internal.mediaType,
      type: 'RamlType',
    },
  };

  createNode(typeNode);
  createParentChildLink({ parent: fileNode, child: typeNode });
}

exports.onCreateNode = onCreateNode;
