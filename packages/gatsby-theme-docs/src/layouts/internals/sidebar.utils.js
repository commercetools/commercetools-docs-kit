export const getItemDescendants = (level, index, ancestorsMap) => {
  const chapterId = `${level}-${index}`;
  if (level === 1) {
    return [chapterId];
  } else {
    const ancestorsArray = ancestorsMap.filter((element) =>
      element.includes(chapterId)
    );
    return [].concat(...ancestorsArray);
  }
};

export const getItemAncestors = (level, index, ancestorsMap) => {
  const chapterId = `${level}-${index}`;
  const ancestorsArray = ancestorsMap.filter((element) =>
    element.includes(chapterId)
  );
  return [].concat(...ancestorsArray);
};
