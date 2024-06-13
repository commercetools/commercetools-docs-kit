export const MIN_DATERANGE = 0;
export const MAX_DATERANGE = 2537011284;

export const buildReleaseNotesQueryString = (group, product, productArea) => {
  let searchState = {
    range: {
      dateTimestamp: `${MIN_DATERANGE}:${MAX_DATERANGE}`,
    },
  };
  if (group) {
    searchState.configure = {
      ...searchState.configure,
      facetFilters: `group:${group}`,
    };
  }
  if (product) {
    searchState.refinementList = {
      ...searchState.refinementList,
      product: [product],
    };
  }
  if (productArea) {
    searchState.refinementList = {
      ...searchState.refinementList,
      productArea: [productArea],
    };
  }
  return searchState.refinementList
    ? `?searchState=${encodeURIComponent(JSON.stringify(searchState))}`
    : '';
};
