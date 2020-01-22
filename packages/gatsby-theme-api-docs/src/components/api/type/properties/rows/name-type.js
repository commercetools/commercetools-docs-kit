import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../../../hooks/use-type-locations';
import capitalizeFirst from '../../../../../utils/capitalize-first';
import renderTypeAsLink from '../../../../../utils/render-type-as-link';

const NameType = ({
  apiKey,
  property,
  parentDiscriminator,
  discriminatorValue,
}) => {
  const typeLocations = useTypeLocations();
  const dataForTypeToLinkTo =
    property.type === 'array' && property.items
      ? { type: property.items.type, displayPrefix: 'Array of ' }
      : { type: property.type, displayPrefix: '' };

  return (
    <SpacingsStack spacing="xs">
      <p>
        <Markdown.InlineCode>{property.name}</Markdown.InlineCode>

        {parentDiscriminator && property.name === parentDiscriminator ? (
          <>
            : <Markdown.InlineCode>{discriminatorValue}</Markdown.InlineCode>
          </>
        ) : null}
      </p>
      <p>
        {dataForTypeToLinkTo.displayPrefix}
        {renderTypeAsLink(
          apiKey,
          capitalizeFirst(dataForTypeToLinkTo.type),
          typeLocations
        )}
      </p>
    </SpacingsStack>
  );
};

NameType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
  parentDiscriminator: PropTypes.string,
  discriminatorValue: PropTypes.string,
};

export default NameType;
