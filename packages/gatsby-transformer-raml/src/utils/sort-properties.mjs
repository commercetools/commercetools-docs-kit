function sortProperties({
  properties = [],
  moveToTop = [],
  moveToBottom = [],
}) {
  const copy = JSON.parse(JSON.stringify(properties));

  return copy.sort((a, b) => {
    const indexInMoveToTopA = moveToTop.indexOf(a.name);
    const indexInMoveToTopB = moveToTop.indexOf(b.name);
    const indexInMoveToBottomA = moveToBottom.indexOf(a.name);
    const indexInMoveToBottomB = moveToBottom.indexOf(b.name);

    // 1. Sort properties in moveToTop
    // a. if a.name and b.name occurs in moveToTop, compare their indexes in moveToTop
    if (indexInMoveToTopA > -1 && indexInMoveToTopB > -1) {
      return indexInMoveToTopA - indexInMoveToTopB;
    }

    // b. if only a.name occurs in moveToTop, return -1, a.name comes first
    if (indexInMoveToTopA > -1) {
      return -1;
    }

    // c. if only b.name occurs in moveToTop, return 1, b.name comes first
    if (indexInMoveToTopB > -1) {
      return 1;
    }

    // 2. Sort properteis in moveToBottom - just do opposite of sorting to first
    if (indexInMoveToBottomA > -1 && indexInMoveToBottomB > -1) {
      return indexInMoveToBottomA - indexInMoveToBottomB;
    }

    if (indexInMoveToBottomA > -1) {
      return 1;
    }

    if (indexInMoveToBottomB > -1) {
      return -1;
    }

    // if neither is in moveToTop or moveToBottom, return 0, position remains unchanged
    return 0;
  });
}

export default sortProperties;
