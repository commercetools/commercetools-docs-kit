export const MIN_DATERANGE = 0;
export const MAX_DATERANGE = 2537011284;

export const isDocsKitSite = (siteTitle) =>
  [
    'Docs Kit Docs',
    'Docs Smoke Test',
    'API Docs Smoke Test',
    'Self-learning Smoke Test',
  ].includes(siteTitle);

export const getReleaseNotesBasePath = (siteTitle) =>
  isDocsKitSite(siteTitle)
    ? 'docs-smoke-test/release-notes'
    : 'docs/release-notes';

// TODO: this could be used to generate sitemap.xml urls query strings
const mapSiteTitleToFacetFilter = new Map([
  ['Merchant Center', { group: 'product', productArea: 'Merchant Center' }],
  ['HTTP API', { group: 'product', productArea: 'HTTP API' }],
  ['Checkout', { group: 'product', product: 'Checkout' }],
  ['Connect', { group: 'product', product: 'Connect' }],
  [
    'Frontend Development',
    { group: 'product', productArea: 'Frontend Development' },
  ],
  ['Frontend Studio', { group: 'product', productArea: 'Frontend Studio' }],
  ['Import API', { group: 'product', productArea: 'Import API' }],
  [
    'Merchant Center Customizations',
    { productArea: 'Merchant Center Customizations' },
  ],
  ['Docs Smoke Test', { productArea: 'Merchant Center Customizations' }],
]);

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

export const getReleaseNotesQueryStringBySiteTitle = (siteTitle) => {
  const facetConfig = mapSiteTitleToFacetFilter.get(siteTitle);
  if (facetConfig) {
    return buildReleaseNotesQueryString(
      facetConfig.group,
      facetConfig.product,
      facetConfig.productArea
    );
  }
  return '';
};
