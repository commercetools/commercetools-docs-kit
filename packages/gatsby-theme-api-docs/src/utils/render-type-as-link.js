import React from 'react';
import { Link } from '@commercetools-docs/gatsby-theme-docs';

function renderTypeAsLink(apiKey, type, typeLocations) {
  const typeLocation = typeLocations
    ? typeLocations[`${apiKey}__${type}`]
    : undefined;

  const originalTypeLocation = typeLocation ? typeLocation.urlAnchorTag : '';

  return originalTypeLocation ? (
    <Link href={originalTypeLocation}>{type}</Link>
  ) : (
    type
  );
}

export default renderTypeAsLink;
