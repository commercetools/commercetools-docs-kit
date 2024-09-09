import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { BetaTag } from '@commercetools-docs/gatsby-theme-docs';
import { typography } from '../../../../design-system';
import RegexProperty from '../regex-properties';
import useTypesToRender from '../../../../hooks/use-type-to-render';
import Required from '../../../required';

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const PropertyName = styled.div`
  white-space: nowrap;
  line-height: ${typography.lineHeights.propertyType};
`;
const PropertyType = styled.div`
  line-height: ${typography.lineHeights.propertyType};
  color: ${designSystem.colors.light.textFaded};
`;
const BetaWrapper = styled.span`
  font-size: ${typography.fontSizes.body};
  line-height: 0.8rem;
  padding-top: 0.2rem;
`;

function UnionPropertiesRow(props) {
  const typesToRender = useTypesToRender({
    property: props.types,
    apiKey: props.apiKey,
    isParameter: true,
  });

  return (
    <>
      Can be{' '}
      {typesToRender.map(({ type }, idx, { length }) =>
        length > idx + 1 ? (
          <span key={idx}>{type}, </span>
        ) : (
          <span key={idx}>or {type}</span>
        )
      )}
    </>
  );
}

UnionPropertiesRow.propTypes = {
  apiKey: PropTypes.string.isRequired,
  types: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    description: PropTypes.string,
    additionalDescription: PropTypes.string,
    items: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
};
UnionPropertiesRow.displayName = 'UnionParametersRow';

const NameType = (props) => {
  const typesToRender = useTypesToRender({
    property: props.property,
    apiKey: props.apiKey,
  });
  const typeToRender = typesToRender[0]; // safe as we expect a single item in the array

  const isRegex = (string) =>
    string.charAt(0) === '/' && string.charAt(string.length - 1) === '/';

  const isTypeUnion = (strType) => {
    return strType === 'Union';
  };

  const getPropertiesType = ({ name, unionParams }, type, apiKey) => {
    if (isRegex(name) && !typeToRender.displayPrefix) {
      return `Any ${typeof type} parameter matching this regular expression`;
    }
    if (isTypeUnion(type)) {
      return <UnionPropertiesRow types={unionParams} apiKey={apiKey} />;
    }
    return type;
  };

  return (
    <SpacingsStack scale="xs">
      <PropertyName>
        <SpacingsInline scale="xs">
          {isRegex(props.property.name) ? (
            <RegexProperty expression={props.property.name} />
          ) : (
            <Markdown.InlineCode>{props.property.name}</Markdown.InlineCode>
          )}
          {'\u200B' /* zero-width space for the search crawler */}
          {props.property.required && <Required />}
          {props.property.beta && (
            <BetaWrapper>
              <BetaTag />
            </BetaWrapper>
          )}
        </SpacingsInline>
      </PropertyName>
      <PropertyType>
        {typeToRender.displayPrefix && typeToRender.displayPrefix}

        {getPropertiesType(props.property, typeToRender.type, props.apiKey)}
        {'\u200B' /* zero-width space for the search crawler */}
      </PropertyType>
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
    unionParams: PropTypes.shape({
      type: PropTypes.string.isRequired,
      builtinType: PropTypes.string.isRequired,
    }),
    required: PropTypes.bool.isRequired,
    beta: PropTypes.bool,
  }).isRequired,
};

export default NameType;
