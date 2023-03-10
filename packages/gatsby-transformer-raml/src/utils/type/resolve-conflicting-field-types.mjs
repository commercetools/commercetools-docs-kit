import computeType  from "../compute-type.mjs";

function resolveConflictingFieldTypes(property) {
  const propsToStringify = ['default', 'enumeration'];

  const returnedProperty = JSON.parse(JSON.stringify(property));

  propsToStringify.forEach((prop) => {
    if (returnedProperty[prop]) {
      returnedProperty[prop] = stringifyField(
        returnedProperty[prop],
        returnedProperty.type
      );
    }
  });

  return returnedProperty;
}

function stringifyField(prop, type) {
  const propType = computeType(prop);

  switch (propType) {
    case 'array':
      return prop.map((val) => {
        return type === 'number' && Number.isInteger(val)
          ? `${val.toFixed(1)}`
          : `${val}`;
      });
    case 'object':
      return JSON.stringify(prop);
    default:
      return type === 'number' && Number.isInteger(prop)
        ? `${prop.toFixed(1)}`
        : `${prop}`;
  }
}

export default resolveConflictingFieldTypes;
