export const getItemDescendants = (level, index, ancestorsMap) => {
  const chapterId = `${level}-${index}`;
  if (level === 1) {
    return [chapterId];
  } else {
    const descendantsArray = ancestorsMap.filter((element) =>
      element.includes(chapterId)
    );
    return [].concat(...descendantsArray);
  }
};

export const getItemAncestors = (level, index, ancestorsMap) => {
  const chapterId = `${level}-${index}`;
  const ancestorsArray = ancestorsMap.filter(
    (element) => element.includes(chapterId) && element.indexOf(chapterId) > 0
  );
  return [].concat(...ancestorsArray);
};

export const isRightChapter = (chapter, loc) => {
  return (
    chapter.pages.find((page) => loc.pathname.includes(page.path)) !== undefined
  );
};

export const isRightChapterRecursive = (chapter, loc) => {
  if (!loc) {
    return false;
  }
  return (
    chapter.pages.find((page) =>
      page.pages
        ? isRightChapterRecursive(page, loc)
        : loc.pathname.includes(page.path)
    ) !== undefined
  );
};
