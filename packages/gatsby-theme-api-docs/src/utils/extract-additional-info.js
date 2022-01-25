const extractAdditionalInfo = (properties) => {
  let additionalInfos = Object.entries(properties).map((prop) => {
    return { name: prop[0], value: prop[1] };
  });

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
    additionalInfos = additionalInfos.filter(
      (entry) => field !== entry.name && entry.value
    );
  });

  const defaultInfo = [];
  const minInfo = [];
  const maxInfo = [];
  const otherInfos = [];
  additionalInfos.forEach((info) => {
    if (info.name.includes('default')) {
      defaultInfo.push(info);
    } else if (info.name.includes('min')) {
      minInfo.push(info);
    } else if (info.name.includes('max')) {
      maxInfo.push(info);
    } else {
      otherInfos.push(info);
    }
  });

  additionalInfos = defaultInfo.concat(minInfo, maxInfo, otherInfos);

  return additionalInfos;
};

export default extractAdditionalInfo;
