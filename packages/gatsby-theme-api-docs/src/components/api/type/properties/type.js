import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../../hooks/use-type-locations';
import originalTypeDisplayText from '../../../../utils/original-type-display-text';

const Type = ({ apiKey, property, dataTestId }) => {
  const typeLocations = useTypeLocations();
  const originalTypeToLinkTo =
    property.type === 'array' && property.items
      ? property.items.originalType
      : property.originalType;

  const typeLocation = typeLocations
    ? typeLocations[`${apiKey}__${originalTypeToLinkTo}`]
    : undefined;

  const originalTypeLocation = typeLocation ? typeLocation.urlAnchorTag : '';
  return (
    <div data-testid={dataTestId ? `${dataTestId}` : null}>
      <div>
        {originalTypeLocation ? (
          <Link href={originalTypeLocation}>
            {originalTypeDisplayText(property)}
          </Link>
        ) : (
          <span>{originalTypeDisplayText(property)}</span>
        )}
      </div>
      <div>
        <Markdown.InlineCode>{property.type}</Markdown.InlineCode>
      </div>
    </div>
  );
};

Type.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.object.isRequired,
  typeLocations: PropTypes.object,
  dataTestId: PropTypes.string,
};

export default Type;
