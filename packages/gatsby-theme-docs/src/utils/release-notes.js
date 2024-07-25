export const buildReleaseNotesQueryString = (group, product, productArea) => {
  const queryStringParams = new URLSearchParams();

  // tab param
  if (group) {
    queryStringParams.set('tab', group);
  }

  // product param
  if (product) {
    queryStringParams.set('product', product);
  }

  // productArea param
  if (productArea) {
    queryStringParams.set('productArea', productArea);
  }

  return `${queryStringParams.toString()}`;
};
