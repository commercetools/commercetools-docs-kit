import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { locationForType } from '../hooks/use-type-locations';

function renderTypeAsLink(apiKey, type, typeLocations) {
  const typeLocation = locationForType(apiKey, type, typeLocations);

  const originalTypeLocation = typeLocation ? typeLocation.urlAnchorTag : '';

  return originalTypeLocation ? (
    <Link href={originalTypeLocation}>{type}</Link>
  ) : (
    type
  );
}

export default renderTypeAsLink;
