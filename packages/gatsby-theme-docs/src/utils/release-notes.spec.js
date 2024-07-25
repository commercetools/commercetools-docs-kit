import { buildReleaseNotesQueryString } from './release-notes';

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

    const expectedValue = `tab=${group}&product=${product.replace(
      ' ',
      '+'
    )}&productArea=${productArea.replace(' ', '+')}`;
    expect(queryString).toBe(expectedValue);
  });

  it('should return a query string with only product', () => {
    const product = 'Checkout';
    const group = 'product';

    const queryString = buildReleaseNotesQueryString(group, product);

    const expectedValue = `tab=${group}&product=${product}`;

    expect(queryString).toBe(expectedValue);
  });

  it('should return an empty query string if no arguments are provided', () => {
    const queryString = buildReleaseNotesQueryString();

    expect(queryString).toBe('');
  });
});
