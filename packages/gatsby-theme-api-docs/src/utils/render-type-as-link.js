import React from 'react';
import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { Markdown } from '@commercetools-docs/ui-kit';
import { locationForType } from '../hooks/use-type-locations';
import { getDescriptionIfPrimitiveType } from '../components/type/type';

function renderTypeAsLink(apiKey, type, typeLocations, contentType) {
  const typeLocation = locationForType(apiKey, type, typeLocations);

  const originalTypeLocation = typeLocation ? typeLocation.url : undefined;

  let primitiveJsonType;
  if (
    !originalTypeLocation &&
    Array.isArray(contentType) &&
    contentType.includes('application/json')
  ) {
    primitiveJsonType = getDescriptionIfPrimitiveType('application/json', type);
  }

  if (originalTypeLocation) {
    return <Link href={originalTypeLocation}>{type}</Link>;
  } else if (primitiveJsonType) {
    return <Markdown.Em>{primitiveJsonType}</Markdown.Em>;
  }
  return type;
}
export default renderTypeAsLink;
