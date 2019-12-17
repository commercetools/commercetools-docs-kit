import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/gatsby-theme-docs';
import { useTypeLocations } from '../../../../hooks/use-type-locations';
import generateTypeDisplayText from '../../../../utils/generate-type-display-text';

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
  const typeDisplayText = generateTypeDisplayText(property);
  return (
    <div data-testid={dataTestId ? `${dataTestId}` : null}>
      <div>
        {originalTypeLocation ? (
          <Markdown.Link href={originalTypeLocation}>
            {typeDisplayText}
          </Markdown.Link>
        ) : (
          <span>{typeDisplayText}</span>
        )}
      </div>
      <div>
        <Markdown.InlineCode>{property.builtinType}</Markdown.InlineCode>
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
