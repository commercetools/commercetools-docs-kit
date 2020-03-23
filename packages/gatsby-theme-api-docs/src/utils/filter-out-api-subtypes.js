const filterOutApiTypeSubtypes = (apiType, apiTypes) => {
  let apiTypeSubTypes;

  if (apiType.oneOf) {
    apiTypeSubTypes = apiType.oneOf.map((subTypeDisplayName) => {
      return apiTypes.find((type) => {
        return type.displayName === subTypeDisplayName;
      });
    });
  }

  return apiTypeSubTypes;
};

export default filterOutApiTypeSubtypes;
