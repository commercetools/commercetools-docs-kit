import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Markdown,
  designSystem as uiKitDesignSystem,
} from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../../hooks/use-type-locations';
import generateTypeToRender from '../../../../utils/generate-type-to-render';
import Required from '../../../required';

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const PropertyName = styled.div`
  display: inline-block;
  margin-right: ${uiKitDesignSystem.dimensions.spacings.s};
  white-space: nowrap;
`;
const PropertyType = styled.div`
  display: inline-block;
`;

const NameType = ({
  apiKey,
  property,
  parentDiscriminator,
  discriminatorValue,
}) => {
  const typeLocations = useTypeLocations();
  const typeToRender = generateTypeToRender({
    typeLocations,
    property,
    apiKey,
  });

  return (
    <>
      <PropertyName className="name-type">
        <Markdown.InlineCode>{property.name}</Markdown.InlineCode>
        {property.required ? <Required /> : null}
      </PropertyName>

      {parentDiscriminator && property.name === parentDiscriminator ? (
        <PropertyName>
          {' '}
          : <Markdown.InlineCode>{discriminatorValue}</Markdown.InlineCode>
        </PropertyName>
      ) : null}
      <PropertyType className="name-type">
        {typeToRender.displayPrefix && (
          <span className="name">{typeToRender.displayPrefix}</span>
        )}

        {typeof typeToRender.type === 'string' ? (
          <span className="name">{typeToRender.type}</span>
        ) : (
          typeToRender.type
        )}
      </PropertyType>
    </>
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
