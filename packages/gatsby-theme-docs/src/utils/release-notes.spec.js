import {
  buildReleaseNotesQueryString,
  getReleaseNotesQueryStringBySiteTitle,
} from './release-notes';

describe('buildReleaseNotesQueryString', () => {
  it('should return a query string with product and productArea', () => {
    const product = 'Merchant Center';
    const productArea = 'Frontend Development';

    const queryString = buildReleaseNotesQueryString(product, productArea);

    expect(queryString).toBe(
      '?searchState=%7B%22range%22%3A%7B%22dateTimestamp%22%3A%220%3A2537011284%22%7D%2C%22refinementList%22%3A%7B%22product%22%3A%5B%22Frontend%20Development%22%5D%7D%7D'
    );
  });

  it('should return a query string with only product', () => {
    const product = 'Checkout';

    const queryString = buildReleaseNotesQueryString(product);

    expect(queryString).toBe(
      '?searchState=%7B%22range%22%3A%7B%22dateTimestamp%22%3A%220%3A2537011284%22%7D%2C%22refinementList%22%3A%7B%22product%22%3A%5B%22Checkout%22%5D%7D%7D'
    );
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
    expect(queryString).toBe(
      '?searchState=%7B%22range%22%3A%7B%22dateTimestamp%22%3A%220%3A2537011284%22%7D%2C%22refinementList%22%3A%7B%22product%22%3A%5B%22Merchant%20Center%22%5D%7D%7D'
    );
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
