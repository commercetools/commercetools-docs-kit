const filterOutApiTypeSubtypes = (apiType, apiTypes) => {
  let apiTypeSubTypes;

  if (apiType.unionLike) {
    apiTypeSubTypes = apiTypes.filter(subType => {
      if (subType.type === 'object') {
        return subType.originalType === apiType.name;
      }

      return false;
    });
  }

  return apiTypeSubTypes;
};

export default filterOutApiTypeSubtypes;
