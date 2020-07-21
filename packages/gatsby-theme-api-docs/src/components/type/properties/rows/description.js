import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { colors, dimensions, typography } from '../../../../design-system';
import extractAdditionalInfo from '../../../../utils/extract-additional-info';
import capitalizeFirst from '../../../../utils/capitalize-first';
import { useApiTypeByApiKeyAndDisplayName } from '../../../../hooks/use-api-types';

const customCodeStyle = css`
  border: none;
  background-color: unset;
`;

const Info = styled.span`
  display: inline-block;
  border: 1px solid ${colors.light.borderInfo};
  background-color: ${colors.light.surfaceInfo};
  padding: ${dimensions.spacings.xxs} ${dimensions.spacings.xs};
  font-size: ${typography.fontSizes.small};
`;
const DescriptionText = styled.span`
  display: inline-block;
`;

const ConstantLikeEnumDescription = (props) => {
  const constantDescriptionsType = useApiTypeByApiKeyAndDisplayName(
    props.apiKey,
    props.property.type
  );

  let constantDescriptionObject;

  if (constantDescriptionsType) {
    constantDescriptionObject =
      constantDescriptionsType.enumDescriptions &&
      constantDescriptionsType.enumDescriptions.find((enumDescription) => {
        return enumDescription.name === props.property.enumeration[0];
      });
  }

  const description =
    (constantDescriptionObject && constantDescriptionObject.description) ||
    props.property.description;

  return (
    <SpacingsStack scale="s">
      <div>
        <Markdown.InlineCode>
          {generateAppropriatePrimitiveText(
            constantDescriptionsType
              ? constantDescriptionsType.type
              : props.property.type,
            props.property.enumeration[0]
          )}
        </Markdown.InlineCode>
      </div>

      {description && (
        <DescriptionText>
          {markdownFragmentToReact(description)}
        </DescriptionText>
      )}
    </SpacingsStack>
  );
};
ConstantLikeEnumDescription.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.shape({
    type: PropTypes.string,
    enumeration: PropTypes.array,
    description: PropTypes.string,
  }),
};

const InfoValue = (props) => {
  const value = props.children;
  const valueType = typeof value;
  switch (valueType) {
    case 'boolean':
      return value ? '' : ': No';
    case 'string':
      return (
        <>
          :{' '}
          <Markdown.InlineCode css={customCodeStyle}>
            {value}
          </Markdown.InlineCode>
        </>
      );
    default:
      return `: ${value}`;
  }
};
InfoValue.propTypes = {
  children: PropTypes.any.isRequired,
};
const AdditionalInfo = (props) => {
  const additionalInfos = extractAdditionalInfo(props.property);
  return (
    <>
      {Object.entries(additionalInfos).map(([info, value], index) => {
        return (
          !(typeof value === 'boolean' && !value) && (
            <Info key={index}>
              {capitalizeFirst(info)}
              <InfoValue>{value}</InfoValue>
            </Info>
          )
        );
      })}
    </>
  );
};
AdditionalInfo.propTypes = {
  property: PropTypes.object.isRequired,
};

const Description = (props) => {
  const isConstantLike =
    props.property.enumeration && props.property.enumeration.length === 1;

  if (isConstantLike) {
    return (
      <ConstantLikeEnumDescription
        apiKey={props.apiKey}
        property={props.property}
      />
    );
  }

  const renderEnums = props.property.enumeration && !props.discriminatorValue;
  return (
    <SpacingsStack scale="s">
      <DescriptionText>
        {markdownFragmentToReact(props.property.description)}
      </DescriptionText>
      <SpacingsInline>
        {renderEnums ? (
          <Info>
            Can be{' '}
            {props.property.enumeration.map((currentEnum, index) => {
              return index === props.property.enumeration.length - 1 ? (
                <React.Fragment key={currentEnum}>
                  or{' '}
                  <Markdown.InlineCode css={customCodeStyle}>
                    {generateAppropriatePrimitiveText(
                      props.property.type,
                      currentEnum
                    )}
                  </Markdown.InlineCode>
                </React.Fragment>
              ) : (
                <React.Fragment key={currentEnum}>
                  <Markdown.InlineCode css={customCodeStyle}>
                    {generateAppropriatePrimitiveText(
                      props.property.type,
                      currentEnum
                    )}
                  </Markdown.InlineCode>
                  ,{' '}
                </React.Fragment>
              );
            })}
          </Info>
        ) : null}
        <AdditionalInfo property={props.property} />
      </SpacingsInline>
    </SpacingsStack>
  );
};
Description.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.object.isRequired,
  discriminatorValue: PropTypes.string,
};

function generateAppropriatePrimitiveText(type, value) {
  switch (type.toLowerCase()) {
    case 'string':
      return `"${value}"`;
    default:
      return value;
  }
}

export default Description;
