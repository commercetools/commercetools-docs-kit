const computeType = require('../compute-type');

function resolveConflictingFieldTypes(property) {
  const propsToStringify = ['default', 'enumeration'];

  const returnedProperty = JSON.parse(JSON.stringify(property));

  propsToStringify.forEach(prop => {
    if (returnedProperty[prop]) {
      returnedProperty[prop] = stringifyField(returnedProperty[prop]);
    }
  });

  return returnedProperty;
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

module.exports = resolveConflictingFieldTypes;
