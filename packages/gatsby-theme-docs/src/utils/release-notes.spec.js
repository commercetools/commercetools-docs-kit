import {
  MAX_DATERANGE,
  MIN_DATERANGE,
  buildReleaseNotesQueryString,
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
