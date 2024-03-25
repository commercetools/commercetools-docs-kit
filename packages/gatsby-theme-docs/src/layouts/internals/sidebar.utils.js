export const getItemDescendants = (
  subChapterId,
  level,
  index,
  ancestorsMap
) => {
  const chapterId = `${level}-${index}`;
  if (level === 1) {
    return [subChapterId];
  } else {
    const descendantsArray = ancestorsMap.filter((element) =>
      element.includes(chapterId)
    );
    return (chapterId.includes('#') ? [subChapterId] : []).concat(
      ...descendantsArray
    );
  }
};

export const getItemAncestors = (chapterId, ancestorsMap) => {
  const ancestorsArray = ancestorsMap.filter(
    (element) => element.includes(chapterId) && element.indexOf(chapterId) > 0
  );
  return [].concat(...ancestorsArray);
};

export const isRightChapter = (chapter, loc) => {
  chapter.pages.forEach((element) => {
    console.log('loc', loc.pathname, element.path);
  });
  return chapter.pages.find((page) => loc.pathname === page.path) !== undefined;
};

export const isRightChapterRecursive = (chapter, loc) => {
  if (!loc) {
    return false;
  }
  return (
    chapter.pages.find((page) =>
      page.pages
        ? isRightChapterRecursive(page, loc)
        : loc.pathname === page.path
    ) !== undefined
  );
};
