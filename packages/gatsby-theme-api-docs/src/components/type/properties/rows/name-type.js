import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../../hooks/use-type-locations';
import capitalizeFirst from '../../../../utils/capitalize-first';
import renderTypeAsLink from '../../../../utils/render-type-as-link';
import Required from '../../../required';

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

  const type = renderTypeAsLink(
    apiKey,
    capitalizeFirst(dataForTypeToLinkTo.type),
    typeLocations
  );

  return (
    <SpacingsStack scale="xs">
      <p className="name-type">
        <Markdown.InlineCode>{property.name}</Markdown.InlineCode>
        {property.required ? <Required>*</Required> : null}

        {parentDiscriminator && property.name === parentDiscriminator ? (
          <>
            {' '}
            : <Markdown.InlineCode>{discriminatorValue}</Markdown.InlineCode>
          </>
        ) : null}
      </p>
      <p className="name-type">
        <span className="name">{dataForTypeToLinkTo.displayPrefix}</span>
        {typeof type === 'string' ? <span className="name">{type}</span> : type}
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
    required: PropTypes.bool.isRequired,
  }).isRequired,
  parentDiscriminator: PropTypes.string,
  discriminatorValue: PropTypes.string,
};

export default NameType;
