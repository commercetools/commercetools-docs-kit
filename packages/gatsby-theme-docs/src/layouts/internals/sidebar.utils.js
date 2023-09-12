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

export const areArraysEquals = (arr1, arr2) => {
  if (!arr1 || !arr2) {
    return false;
  }
  // Remove duplicates from both arrays using Set
  const uniqueArr1 = [...new Set(arr1)];
  const uniqueArr2 = [...new Set(arr2)];

  // Check if the unique arrays have the same length
  if (uniqueArr1.length !== uniqueArr2.length) {
    return false;
  }

  // Sort both unique arrays
  const sortedArr1 = uniqueArr1.slice().sort();
  const sortedArr2 = uniqueArr2.slice().sort();

  // Compare each element
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  // If all elements match, the arrays have the same elements
  return true;
};
