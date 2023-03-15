import computeType  from "../compute-type.mjs";

/**
 * This does a deep post processing needed on all fields on a type
 */
function doRecursion(type) {
  let returnedType = {};

  Object.keys(type).forEach((key) => {
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

export default doRecursion;
