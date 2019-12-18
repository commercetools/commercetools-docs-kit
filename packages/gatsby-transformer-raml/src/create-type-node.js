const computeType = require('./compute-type');

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
  const postProcessedType = doRecursion(type);

  postProcessedType.apiKey = fileNodeRelativeDirectory.replace(`/types`, '');
  postProcessedType.properties = processProperties(
    postProcessedType.properties
  );
  postProcessedType.examples = examplesToArrays(postProcessedType.examples);
  postProcessedType.enumDescriptions = enumDescriptionsToArray(
    postProcessedType.enumDescriptions
  );

  return postProcessedType;
}

function doRecursion(type) {
  let returnedType = {};

  Object.keys(type).forEach(key => {
    // remove parenthesis from annotation identifier
    let keyWithoutParenthesis = key.replace(`(`, '').replace(`)`, '');

    // use enumeration as enum is a reserved JavaScript keyword
    keyWithoutParenthesis =
      keyWithoutParenthesis === 'enum' ? 'enumeration' : keyWithoutParenthesis;

    if (computeType(type[key]) === 'object') {
      returnedType[keyWithoutParenthesis] = doRecursion(type[key]);
      return;
    }

    returnedType[keyWithoutParenthesis] = type[key];

    // generate constant field for constant-like
    if (keyWithoutParenthesis === 'enumeration') {
      const { enumeration } = returnedType;

      if (enumeration.length === 1) {
        returnedType = { ...returnedType, constant: enumeration[0] };
      }
    }
  });

  return returnedType;
}

function processProperties(properties) {
  let propertiesArray = propertiesToArrays(properties);

  propertiesArray = resolveConflictingFieldTypes(propertiesArray);
  propertiesArray = sortProperties(propertiesArray);

  return propertiesArray;
}

function propertiesToArrays(properties) {
  if (properties) {
    return Object.entries(properties).map(([key, value]) => {
      return { ...value, name: key };
    });
  }

  return undefined;
}

function resolveConflictingFieldTypes(properties) {
  if (properties) {
    const propsToStringify = ['default', 'enumeration'];

    return properties.map(property => {
      const returnedProperty = JSON.parse(JSON.stringify(property));

      propsToStringify.forEach(prop => {
        if (returnedProperty[prop]) {
          returnedProperty[prop] = stringifyField(returnedProperty[prop]);
        }
      });

      return returnedProperty;
    });
  }

  return null;
}

function stringifyField(prop) {
  const propType = computeType(prop);

  switch (propType) {
    case 'array':
      return prop.map(val => {
        return `${val}`;
      });
    case 'object':
      return JSON.stringify(prop);
    default:
      return `${prop}`;
  }
}

function sortProperties(properties) {
  if (properties) {
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
    const copy = JSON.parse(JSON.stringify(properties));

    return copy.sort((a, b) => {
      const indexInMoveToTopA = moveToTop.indexOf(a.name);
      const indexInMoveToTopB = moveToTop.indexOf(b.name);
      const indexInMoveToBottomA = moveToBottom.indexOf(a.name);
      const indexInMoveToBottomB = moveToBottom.indexOf(b.name);

      // 1. Sort properties in moveToTop
      // a. if a.name and b.name occurs in moveToTop, compare their indexes in moveToTop
      if (indexInMoveToTopA > -1 && indexInMoveToTopB > -1) {
        return indexInMoveToTopA - indexInMoveToTopB;
      }

      // b. if only a.name occurs in moveToTop, return -1, a.name comes fist
      if (indexInMoveToTopA > -1) {
        return -1;
      }

      // c. if only b.name occurs in moveToTop, return 1, b.name comes fist
      if (indexInMoveToTopB > -1) {
        return 1;
      }

      // 2. Sort properteis in moveToBottom - just do opposite of sorting to first
      if (indexInMoveToBottomA > -1 && indexInMoveToBottomB > -1) {
        return indexInMoveToTopB - indexInMoveToTopA;
      }

      if (indexInMoveToBottomA > -1) {
        return 1;
      }

      if (indexInMoveToBottomB > -1) {
        return -1;
      }

      // if neither is in moveToTop or moveToBottom, return 0, position remains unchanged
      return 0;
    });
  }

  return properties;
}

function examplesToArrays(examples) {
  if (examples) {
    return Object.entries(examples).map(([key, value]) => {
      return { name: key, file: value };
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
