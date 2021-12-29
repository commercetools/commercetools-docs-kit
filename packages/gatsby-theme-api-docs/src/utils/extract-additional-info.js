const reorderFields = (obj, fields) => {
  const returnedObject = { ...obj };

  fields.forEach((field) => {
    const fieldToOrder = returnedObject[field];
    if (fieldToOrder) {
      delete returnedObject[field];
      returnedObject[field] = fieldToOrder;
    }
  });

  return returnedObject;
};

const extractAdditionalInfo = (property) => {
  let additionalInfo = JSON.parse(JSON.stringify(property));
  const mainInfo = [
    'beta',
    'builtinType',
    'constant',
    'description',
    'enumeration',
    'inherited',
    'items',
    'library',
    'name',
    'originalType',
    'required',
    'type',
  ];

  mainInfo.forEach((field) => {
    delete additionalInfo[field];
  });

  Object.keys(additionalInfo).forEach((key) => {
    if (
      (!additionalInfo[key] &&
        typeof additionalInfo[key] !== 'number' &&
        typeof additionalInfo[key] !== 'boolean') ||
      typeof additionalInfo[key] === 'object'
    )
      delete additionalInfo[key];
  });

  additionalInfo = reorderFields(additionalInfo, ['default']);

  return additionalInfo;
};

export default extractAdditionalInfo;
