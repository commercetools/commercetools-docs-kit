const getSiteContextTitleByPath = (sitePathsMap, sitePath) => {
  const siteSegment = sitePath.replace('/', '');
  if (sitePathsMap.has(siteSegment)) {
    return sitePathsMap.get(siteSegment);
  }
};

export default getSiteContextTitleByPath;
