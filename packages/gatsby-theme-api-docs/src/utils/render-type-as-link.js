import React from 'react';
import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { locationForType } from '../hooks/use-type-locations';

function renderTypeAsLink(apiKey, type, typeLocations, description) {
  const typeLocation = locationForType(apiKey, type, typeLocations);

  const originalTypeLocation = typeLocation ? typeLocation.url : '';

  return originalTypeLocation ? (
    <Link href={originalTypeLocation}>{type}</Link>
  ) : description ? (
    description
  ) : (
    type
  );
}

export default renderTypeAsLink;
