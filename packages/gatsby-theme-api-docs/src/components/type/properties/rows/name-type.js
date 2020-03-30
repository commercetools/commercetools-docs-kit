import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../../hooks/use-type-locations';
import generateTypeToRender from '../../../../utils/generate-type-to-render';
import Required from '../../../required';

const NameType = ({
  apiKey,
  property,
  parentDiscriminator,
  discriminatorValue,
}) => {
  const typeToRender = generateTypeToRender({
    typeLocations: useTypeLocations(),
    property,
    apiKey,
  });

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
        {typeToRender.displayPrefix && (
          <span className="name">{typeToRender.displayPrefix}</span>
        )}

        {typeof typeToRender.type === 'string' ? (
          <span className="name">{typeToRender.type}</span>
        ) : (
          typeToRender.type
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
    required: PropTypes.bool.isRequired,
  }).isRequired,
  parentDiscriminator: PropTypes.string,
  discriminatorValue: PropTypes.string,
};

export default NameType;
