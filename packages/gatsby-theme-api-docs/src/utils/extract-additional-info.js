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
    'unionParams',
  ];

  mainInfo.forEach((field) => {
    additionalInfos = additionalInfos.filter(
      (entry) => field !== entry.name && entry.value
    );
  });

  // The code below orders the infos so that the default value and the min-max values are ordered at the beginning of the array.
  const defaultInfo = [];
  const minInfo = [];
  const maxInfo = [];
  const otherInfos = [];
  additionalInfos.forEach((info) => {
    if (info.name.startsWith('default')) {
      defaultInfo.push(info);
    } else if (info.name.startsWith('min')) {
      minInfo.push(info);
    } else if (info.name.startsWith('max')) {
      maxInfo.push(info);
    } else {
      otherInfos.push(info);
    }
  });

  additionalInfos = defaultInfo.concat(minInfo, maxInfo, otherInfos);

  return additionalInfos;
};

export default extractAdditionalInfo;
