import React from 'react';
import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { markdownFragmentToReact } from '@commercetools-docs/ui-kit';
import { locationForType } from '../hooks/use-type-locations';

function renderTypeAsLink(apiKey, type, typeLocations, description) {
  const typeLocation = locationForType(apiKey, type, typeLocations);

  const originalTypeLocation = typeLocation ? typeLocation.url : '';

  return originalTypeLocation ? (
    <Link href={originalTypeLocation}>{type}</Link>
  ) : description ? (
    markdownFragmentToReact(description)
  ) : (
    type
  );
}

export default renderTypeAsLink;
