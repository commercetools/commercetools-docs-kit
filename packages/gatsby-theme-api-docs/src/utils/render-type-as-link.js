import React from 'react';
import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { markdownFragmentToReact } from '@commercetools-docs/ui-kit';
import { locationForType } from '../hooks/use-type-locations';
import { getPrimitiveTypeByName } from '../components/type/type';

function renderTypeAsLink(
  apiKey,
  type,
  typeLocations,
  description,
  contentType
) {
  const typeLocation = locationForType(apiKey, type, typeLocations);

  const originalTypeLocation = typeLocation ? typeLocation.url : '';

  let primitiveJsonType;
  if (
    !originalTypeLocation &&
    Array.isArray(contentType) &&
    contentType.includes('application/json')
  ) {
    primitiveJsonType = getPrimitiveTypeByName('application/json', type);
  }

  if (originalTypeLocation) {
    return <Link href={originalTypeLocation}>{type}</Link>;
  } else if (description) {
    return markdownFragmentToReact(description);
  } else if (primitiveJsonType) {
    return markdownFragmentToReact(primitiveJsonType);
  }
  return type;
}
export default renderTypeAsLink;
