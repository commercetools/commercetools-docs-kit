import doRecursion from './utils/type/do-recursion.mjs';
import sortProperties from './utils/sort-properties.mjs';
import resolveConflictingFieldTypes from './utils/type/resolve-conflicting-field-types.mjs';
import generateType from './utils/type/generate-type.mjs';
import generateBuiltinType from './utils/type/generate-built-in-type.mjs';
import { examplesToArray } from './utils/resource/examples-to-array.mjs';
import propertiesToArray from './utils/properties-to-array.mjs';

function createTypeNode({
  apiKey,
  type,
  fileNode,
  createNode,
  createNodeId,
  createParentChildLink,
  createContentDigest,
  moveTypePropertiesToTop,
  moveTypePropertiesToBottom,
}) {
  const postProcessedType = postProcessType({
    apiKey,
    type,
    fileNode,
    moveTypePropertiesToTop,
    moveTypePropertiesToBottom,
  });

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

function postProcessType({
  apiKey,
  type,
  fileNode,
  moveTypePropertiesToTop,
  moveTypePropertiesToBottom,
}) {
  const postProcessedType = doRecursion(type);

  postProcessedType.apiKey = apiKey;
  postProcessedType.properties = processProperties({
    properties: postProcessedType.properties,
    moveTypePropertiesToTop,
    moveTypePropertiesToBottom,
  });
  postProcessedType.examples = examplesToArray(postProcessedType.examples);
  postProcessedType.enumDescriptions = enumValuesToArray(
    postProcessedType.enumDescriptions
  );
  postProcessedType.enumGroups = enumValuesToArray(
    postProcessedType.enumGroups
  );

  return postProcessedType;
}

function processProperties({
  properties,
  moveTypePropertiesToTop,
  moveTypePropertiesToBottom,
}) {
  let propertiesArray;

  if (properties) {
    propertiesArray = propertiesToArray(properties);
    propertiesArray = propertiesArray.filter(
      (property) => !property.deprecated && !property.markDeprecated
    );
    propertiesArray = sortProperties({
      properties: propertiesArray,
      moveToTop: moveTypePropertiesToTop,
      moveToBottom: moveTypePropertiesToBottom,
    });

    propertiesArray = propertiesArray.map((property) => {
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

function enumValuesToArray(enumValue) {
  if (enumValue) {
    return Object.entries(enumValue).map(([key, value]) => {
      return { name: key, description: value };
    });
  }

  return undefined;
}

export default createTypeNode;
