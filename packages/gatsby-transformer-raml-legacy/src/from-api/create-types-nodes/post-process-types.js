const postProcessTypes = (
  obj,
  {
    annotateConstantLikeEnums,
    annotateUnionLikeInheritance,
    customNumberScalars,
    flattenLibraryNamespaces,
    movePropertiesToTop,
    movePropertiesToBottom,
  }
) => {
  let postProcessedObj = {
    ...obj,
    properties: resolveConflictingFieldTypes(obj.properties),
  };
  postProcessedObj = {
    ...postProcessedObj,
    properties: sortBasedOnMovePropertiesTo(
      postProcessedObj.properties,
      movePropertiesToTop,
      movePropertiesToBottom
    ),
  };
  postProcessedObj = annotateUnionLike(
    postProcessedObj,
    annotateUnionLikeInheritance
  );
  postProcessedObj = doRecursion(postProcessedObj, {
    annotateConstantLikeEnums,
    customNumberScalars,
    flattenLibraryNamespaces,
  });
  return postProcessedObj;
};

function resolveConflictingFieldTypes(properties) {
  if (properties) {
    const propsToStringify = ['default', 'enum'];

    return properties.map((property) => {
      const returnedProperty = JSON.parse(JSON.stringify(property));

      propsToStringify.forEach((prop) => {
        if (returnedProperty[prop]) {
          returnedProperty[prop] = stringifyField(returnedProperty[prop]);
        }
      });

      return returnedProperty;
    });
  }

  return null;
}

function sortBasedOnMovePropertiesTo(
  properties,
  movePropertiesToTop,
  movePropertiesToBottom
) {
  if (properties) {
    const sortedProperties = [];

    movePropertiesToTop.forEach((item) => {
      const propertyOnTop = properties.find((property) => {
        return property.name === item;
      });

      if (propertyOnTop) {
        sortedProperties.push(propertyOnTop);
      }
    });

    properties.forEach((property) => {
      if (
        !movePropertiesToTop.includes(property.name) &&
        !movePropertiesToBottom.includes(property.name)
      ) {
        sortedProperties.push(property);
      }
    });

    movePropertiesToBottom.forEach((item) => {
      const propertyAtBottom = properties.find((property) => {
        return property.name === item;
      });

      if (propertyAtBottom) {
        sortedProperties.push(propertyAtBottom);
      }
    });

    return sortedProperties;
  }

  return null;
}

function stringifyField(prop) {
  const propType = type(prop);

  switch (propType) {
    case 'array':
      return prop.map((val) => {
        return `${val}`;
      });
    case 'object':
      return JSON.stringify(prop);
    default:
      return `${prop}`;
  }
}

function annotateUnionLike(obj, annotateUnionLikeInheritance) {
  if (annotateUnionLikeInheritance) {
    if (
      obj.type === 'object' &&
      obj.discriminator &&
      !obj.discriminatorValue &&
      obj.properties &&
      obj.properties.length === 1
    ) {
      return { ...obj, unionLike: true };
    }
  }
  return obj;
}

function doRecursion(
  obj,
  { annotateConstantLikeEnums, customNumberScalars, flattenLibraryNamespaces }
) {
  let objC = obj ? JSON.parse(JSON.stringify(obj)) : obj;

  objC = processEnums(objC, annotateConstantLikeEnums);

  if (flattenLibraryNamespaces) objC = flattenNamespaces(objC);

  objC = transformTypes(objC, customNumberScalars);

  const keys = Object.keys(objC);

  keys.forEach((key) => {
    if (objC[key] !== null) {
      if (key === 'annotations') {
        objC = Object.assign(objC, annotationsToObject(objC[key]));
      } else if (typeof objC[key] === 'object') {
        objC[key] = doRecursion(objC[key], {
          annotateConstantLikeEnums,
          customNumberScalars,
          flattenLibraryNamespaces,
        });
      }
    }
  });

  return objC;
}

function processEnums(obj, annotateConstantLikeEnums) {
  const objWithRenamedEnum = renameEnumField(obj);
  if (annotateConstantLikeEnums) return addConstants(objWithRenamedEnum);
  return obj;
}

// Necessary because enum is JavaScript reserved keyword
function renameEnumField(obj) {
  if (obj.enum) {
    const objectWithEnum = { ...obj, enumeration: [...obj.enum] };
    delete objectWithEnum.enum;
    return objectWithEnum;
  }

  return obj;
}

function addConstants(obj) {
  if (obj.enumeration && obj.enumeration.length === 1) {
    return { ...obj, constant: obj.enumeration[0] };
  }
  return obj;
}

function flattenNamespaces(obj) {
  let { originalType } = obj;

  if (type(originalType) === 'string') {
    const stringParts = originalType.split('.');
    originalType = stringParts.pop();

    const library = stringParts.join('.');

    return { ...obj, originalType, library };
  }

  return obj;
}

function type(value) {
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  return (matches[1] || 'undefined').toLowerCase();
}

function transformTypes(obj, customNumberScalars) {
  let returnedObj = JSON.parse(JSON.stringify(obj));

  if (customNumberScalars)
    returnedObj = generateCustomNumberScalar(returnedObj);

  returnedObj.originalType = generateOriginalType(returnedObj);

  returnedObj.type = generateType(returnedObj);

  return returnedObj;
}

function generateCustomNumberScalar(obj) {
  const { originalType } = obj;

  if (!originalType) return generateNumberOriginalType(obj);

  return obj;
}

function generateNumberOriginalType(obj) {
  const { format } = obj;

  if (format) {
    return originalTypeIfNumberHasFormat(obj);
  }

  return originalTypeIfNumberHasNoFormat(obj);
}

function originalTypeIfNumberHasFormat(obj) {
  const objC = { ...obj };
  const { format } = objC;

  switch (format) {
    case 'int':
    case 'int8':
    case 'int16':
    case 'int32':
    case 'int64':
    case 'long':
      objC.originalType = 'Int';
      break;
    case 'float':
    case 'double':
      objC.originalType = 'Float';
      break;
    default:
      break;
  }

  // Necessary step since there are other raml types, e.g. "datetime", with "format" field
  if (objC.originalType) {
    delete objC.format;
    objC.type = 'number';
  }

  return objC;
}

function originalTypeIfNumberHasNoFormat(obj) {
  switch (obj.type) {
    case 'integer':
      return { ...obj, originalType: 'Int', type: 'number' };
    case 'float':
    case 'double':
      return { ...obj, originalType: 'Float', type: 'number' };
    default:
      break;
  }

  return obj;
}

function generateOriginalType(obj) {
  if (obj.originalType) return obj.originalType;

  switch (obj.type) {
    case 'date-only':
      return 'Date';
    case 'time-only':
      return 'Time';
    case 'datetime-only':
      return 'DateTimeOnly';
    case 'datetime':
      if (obj.format) {
        return obj.format === 'rfc2616' ? 'DateTimeRfc2616' : 'DateTime';
      }
      return 'DateTime';
    default:
      return obj.type;
  }
}

function generateType(obj) {
  switch (obj.type) {
    case 'date-only':
    case 'time-only':
    case 'datetime-only':
    case 'datetime':
      return 'string';
    case 'object':
      if (obj.enumeration) return 'string';
      return obj.type;
    default:
      return obj.type;
  }
}

function annotationsToObject(annotations) {
  if (Array.isArray(annotations)) {
    const annotationsObj = {};

    annotations.forEach((annotation) => {
      if (type(annotation.structuredValue) === 'object')
        annotationsObj[annotation.key] = structuredValueObjectToArray(
          annotation.structuredValue
        );
      else annotationsObj[annotation.key] = annotation.structuredValue;
    });

    return annotationsObj;
  }
  return annotations;
}

function structuredValueObjectToArray(structuredValue) {
  return Object.keys(structuredValue).map((key) => {
    return {
      name: key,
      description: structuredValue[key],
    };
  });
}

module.exports = {
  postProcessTypes,
  resolveConflictingFieldTypes,
  sortBasedOnMovePropertiesTo,
  annotateUnionLike,
  renameEnumField,
  addConstants,
  generateCustomNumberScalar,
  transformTypes,
  flattenNamespaces,
  generateOriginalType,
  generateType,
  annotationsToObject,
};
