import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { colors, dimensions, typography } from '../../../../design-system';

import extractAdditionalInfo from '../../../../utils/extract-additional-info';
import { values as valuesStr } from '../../../../utils/constants';

const Info = styled.span`
  display: inline-block;
  border: 1px solid ${colors.light.borderInfo};
  background-color: ${colors.light.surfaceInfo};
  padding: ${dimensions.spacings.xxs} ${dimensions.spacings.xs};
  font-size: ${typography.fontSizes.small};
`;
const InfoValue = (props) => {
  const value = props.children;
  const valueType = typeof value;
  switch (valueType) {
    case 'boolean':
      return value ? '' : ': No';
    case 'string':
      return (
        <>
          : <Markdown.InlineCode>{value}</Markdown.InlineCode>
        </>
      );
    default:
      return `: ${value}`;
  }
};
const DescriptionText = styled.span`
  display: inline-block;
`;

const Description = ({ property, discriminatorValue }) => {
  const additionalInfos = extractAdditionalInfo(property);
  const renderEnums = property.enumeration && !discriminatorValue;
  return (
    <SpacingsStack scale="s">
      <DescriptionText>
        {markdownFragmentToReact(property.description)}
      </DescriptionText>
      <SpacingsInline>
        {renderEnums ? (
          <Info>
            {valuesStr}: {property.enumeration.join(', ')}
          </Info>
        ) : null}
        {Object.entries(additionalInfos).map(([info, value], index) => {
          return (
            !(typeof value === 'boolean' && !value) && (
              <Info key={index}>
                {info}
                <InfoValue>{value}</InfoValue>
              </Info>
            )
          );
        })}
      </SpacingsInline>
    </SpacingsStack>
  );
};

InfoValue.propTypes = {
  children: PropTypes.any.isRequired,
};

Description.propTypes = {
  property: PropTypes.object.isRequired,
  discriminatorValue: PropTypes.string,
};

export default Description;
