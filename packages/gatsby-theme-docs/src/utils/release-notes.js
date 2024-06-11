export const MIN_DATERANGE = 0;
export const MAX_DATERANGE = 2537011284;

// TODO: this could be used to generate sitemap.xml urls query strings
const mapSiteTitleToFacetFilter = new Map([
  ['Merchant Center', { productArea: 'Merchant Center' }],
  ['HTTP API', { productArea: 'HTTP API' }],
  ['Checkout', { product: 'Checkout' }],
  ['Connect', { product: 'Connect' }],
  ['Frontend Development', { productArea: 'Frontend Development' }],
  ['Frontend Studio', { productArea: 'Frontend Studio' }],
  ['Import API', { productArea: 'Import API' }],
  [
    'Merchant Center Customizations',
    { productArea: 'Merchant Center Customizations' },
  ],
]);

export const buildReleaseNotesQueryString = (product, productArea) => {
  let searchState = {
    range: {
      dateTimestamp: `${MIN_DATERANGE}:${MAX_DATERANGE}`,
    },
  };
  if (product) {
    searchState.refinementList = {
      ...searchState.refinementList,
      product: [product],
    };
  }
  if (productArea) {
    searchState.refinementList = {
      ...searchState.refinementList,
      product: [productArea],
    };
  }
  return searchState.refinementList
    ? `?searchState=${encodeURIComponent(JSON.stringify(searchState))}`
    : '';
};

export const getReleaseNotesQueryStringBySiteTitle = (siteTitle) => {
  const productArea = mapSiteTitleToFacetFilter.get(siteTitle);
  if (productArea) {
    return buildReleaseNotesQueryString(
      productArea.product,
      productArea.productArea
    );
  }
  return '';
};
