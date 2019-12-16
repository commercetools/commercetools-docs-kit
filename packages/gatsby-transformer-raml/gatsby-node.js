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
  const postProcessedType = postProcessType(type, fileNode.relativeDirectory);

  const typeNode = {
    ...postProcessedType,
    id: createNodeId(`${fileNode.id} >>> RAML_TYPE`),
    children: [],
    parent: fileNode.id,
    internal: {
      contentDigest: createContentDigest(postProcessedType),
      mediaType: fileNode.internal.mediaType,
      type: 'RamlType',
    },
  };

  createNode(typeNode);
  createParentChildLink({ parent: fileNode, child: typeNode });
}

function postProcessType(type, fileNodeRelativeDirectory) {
  const postProcessedType = extractParenthesisFromAnnotationIdentifier(type);

  postProcessedType.apiKey = fileNodeRelativeDirectory.replace(`/types`, '');
  postProcessedType.properties = propertiesToArrays(
    postProcessedType.properties
  );
  postProcessedType.examples = examplesToArrays(postProcessedType.examples);

  return postProcessedType;
}

function extractParenthesisFromAnnotationIdentifier(type) {
  const returnedType = {};

  Object.keys(type).forEach(key => {
    const keyWithoutParenthesis = key.replace(`(`, '').replace(`)`, '');

    if (computeType(type[key]) === 'object') {
      returnedType[
        keyWithoutParenthesis
      ] = extractParenthesisFromAnnotationIdentifier(type[key]);
      return;
    }

    returnedType[keyWithoutParenthesis] = type[key];
  });

  return returnedType;
}

function computeType(value) {
  /**
   * More info about why we need this better type checker here:
   * https://blog.logrocket.com/javascript-typeof-2511d53a1a62/
   */
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  return (matches[1] || 'undefined').toLowerCase();
}

function propertiesToArrays(properties) {
  if (properties) {
    return Object.entries(properties).map(([key, value]) => {
      return { name: key, definition: value };
    });
  }

  return undefined;
}

function examplesToArrays(examples) {
  if (examples) {
    return Object.entries(examples).map(([key, value]) => {
      return { name: key, path: value };
    });
  }

  return undefined;
}

exports.onCreateNode = onCreateNode;
