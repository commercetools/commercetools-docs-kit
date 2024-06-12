import {
  MAX_DATERANGE,
  MIN_DATERANGE,
  buildReleaseNotesQueryString,
  getReleaseNotesQueryStringBySiteTitle,
} from './release-notes';

describe('buildReleaseNotesQueryString', () => {
  it('should return a query string with product and productArea', () => {
    const product = 'Merchant Center';
    const productArea = 'Frontend Development';
    const group = 'product';

    const queryString = buildReleaseNotesQueryString(
      group,
      product,
      productArea
    );

    const expectedValue = {
      range: {
        dateTimestamp: `${MIN_DATERANGE}:${MAX_DATERANGE}`,
      },
      configure: {
        facetFilters: `group:${group}`,
      },
      refinementList: {
        product: [product],
        productArea: [productArea],
      },
    };
    const expectedStringValue = encodeURIComponent(
      JSON.stringify(expectedValue)
    );

    expect(queryString).toBe(`?searchState=${expectedStringValue}`);
  });

  it('should return a query string with only product', () => {
    const product = 'Checkout';
    const group = 'product';

    const queryString = buildReleaseNotesQueryString(group, product);

    const expectedValue = {
      range: {
        dateTimestamp: `${MIN_DATERANGE}:${MAX_DATERANGE}`,
      },
      configure: {
        facetFilters: `group:${group}`,
      },
      refinementList: {
        product: [product],
      },
    };
    const expectedStringValue = encodeURIComponent(
      JSON.stringify(expectedValue)
    );

    expect(queryString).toBe(`?searchState=${expectedStringValue}`);
  });

  it('should return an empty query string if no arguments are provided', () => {
    const queryString = buildReleaseNotesQueryString();

    expect(queryString).toBe('');
  });
});

describe('getReleaseNotesQueryStringBySiteTitle', () => {
  it('should return a query string with productArea for "Merchant Center"', () => {
    const siteTitle = 'Merchant Center';
    const queryString = getReleaseNotesQueryStringBySiteTitle(siteTitle);

    const expectedValue = {
      range: {
        dateTimestamp: `${MIN_DATERANGE}:${MAX_DATERANGE}`,
      },
      configure: {
        facetFilters: `group:product`,
      },
      refinementList: {
        productArea: ['Merchant Center'],
      },
    };
    const expectedStringValue = encodeURIComponent(
      JSON.stringify(expectedValue)
    );

    expect(queryString).toBe(`?searchState=${expectedStringValue}`);
  });

  it('should return an empty query string if siteTitle is not found', () => {
    const siteTitle = 'Non-existent Title';
    const queryString = getReleaseNotesQueryStringBySiteTitle(siteTitle);
    expect(queryString).toBe('');
  });
});

it('should return an empty query string if siteTitle is not found', () => {
  const siteTitle = 'Non-existent Title';
  const queryString = getReleaseNotesQueryStringBySiteTitle(siteTitle);
  expect(queryString).toBe('');
});
