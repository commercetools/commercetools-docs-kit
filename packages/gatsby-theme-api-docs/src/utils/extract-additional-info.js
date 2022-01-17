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

  const tagIdentifier = ['max', 'min', 'default'];
  let sortedList = Object.entries(additionalInfo);

  tagIdentifier.forEach((tag) => {
    sortedList.forEach((item) => {
      if (item[0].includes(tag)) {
        sortedList.unshift(item);
      }
      sortedList.push(item);
    });
  });

  let sortedAdditionalInfo = {};
  sortedList.forEach((item) => {
    sortedAdditionalInfo[item[0]] = item[1];
  });

  return sortedAdditionalInfo;
};

export default extractAdditionalInfo;
