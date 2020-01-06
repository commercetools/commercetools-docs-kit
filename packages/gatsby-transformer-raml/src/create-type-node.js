const path = require('path');
const fs = require('fs');
const doRecursion = require('./utils/type/do-recursion');
const sortProperties = require('./utils/type/sort-properties');
const resolveConflictingFieldTypes = require('./utils/type/resolve-conflicting-field-types');
const generateType = require('./utils/type/generate-type');
const generateBuiltinType = require('./utils/type/generate-built-in-type');

// Properties to sort to top and bottom
const moveToTop = [
  'id',
  'version',
  'key',
  'createdAt',
  'createdBy',
  'lastModifiedAt',
  'lastModifiedBy',
];
const moveToBottom = ['custom'];

function createTypeNode({
  type,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
}) {
  const postProcessedType = postProcessType(type, fileNode);

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

function postProcessType(type, fileNode) {
  const postProcessedType = doRecursion(type);

  postProcessedType.apiKey = fileNode.relativeDirectory.replace(`/types`, '');
  postProcessedType.properties = processProperties(
    postProcessedType.properties
  );
  postProcessedType.examples = examplesToArrays(
    postProcessedType.examples,
    fileNode.dir
  );
  postProcessedType.enumDescriptions = enumDescriptionsToArray(
    postProcessedType.enumDescriptions
  );

  return postProcessedType;
}

function processProperties(properties) {
  let propertiesArray;

  if (properties) {
    propertiesArray = propertiesToArrays(properties);
    propertiesArray = sortProperties({
      properties: propertiesArray,
      moveToTop,
      moveToBottom,
    });

    propertiesArray = propertiesArray.map(property => {
      let returnedProperty = resolveConflictingFieldTypes(property);
      returnedProperty = {
        ...returnedProperty,
        type: generateType(returnedProperty),
        builtinType: generateBuiltinType(returnedProperty),
      };
      return returnedProperty;
    });

    return propertiesArray;
  }

  return undefined;
}

function propertiesToArrays(properties) {
  return Object.entries(properties).map(([key, value]) => {
    return { ...value, name: key };
  });
}

function examplesToArrays(examples, fileNodeDir) {
  if (examples) {
    return Object.entries(examples).map(([key, value]) => {
      const exampleAbsolutePath = path.resolve(fileNodeDir, value.value);
      const jsonString = fs.readFileSync(exampleAbsolutePath, 'utf8');
      return { key, ...value, value: jsonString };
    });
  }

  return undefined;
}

function enumDescriptionsToArray(enumDescriptions) {
  if (enumDescriptions) {
    return Object.entries(enumDescriptions).map(([key, value]) => {
      return { name: key, description: value };
    });
  }

  return undefined;
}

module.exports = createTypeNode;
