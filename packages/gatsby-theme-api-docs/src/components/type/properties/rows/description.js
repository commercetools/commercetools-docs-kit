import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { colors, dimensions, typography } from '../../../../design-system';
import extractAdditionalInfo from '../../../../utils/extract-additional-info';
import { useApiTypeByApiKeyAndDisplayName } from '../../../../hooks/use-api-types';

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
const constantTypesToExcludeFromLookip = ['Int', 'String', 'Float'];

const ConstantLikeEnumDescription = (props) => {
  const constantDescriptionsType = useApiTypeByApiKeyAndDisplayName(
    props.apiKey,
    props.apiType
  );

  let constantDescription;

  if (constantDescriptionsType) {
    constantDescription =
      constantDescriptionsType.enumDescriptions &&
      constantDescriptionsType.enumDescriptions.find((enumDescription) => {
        return enumDescription.name === props.constant;
      });
  }

  return (
    <SpacingsStack scale="s">
      <div>
        <Markdown.InlineCode>{props.constant}</Markdown.InlineCode>
      </div>

      {constantDescription && constantDescription.description && (
        <DescriptionText>
          {markdownFragmentToReact(constantDescription.description)}
        </DescriptionText>
      )}
    </SpacingsStack>
  );
};
ConstantLikeEnumDescription.propTypes = {
  constant: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
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
          : <Markdown.InlineCode>{value}</Markdown.InlineCode>
        </>
      );
    default:
      return `: ${value}`;
  }
};
InfoValue.propTypes = {
  children: PropTypes.any.isRequired,
};

const Description = (props) => {
  const isConstantLike =
    props.property.enumeration && props.property.enumeration.length === 1;

  if (
    isConstantLike &&
    !constantTypesToExcludeFromLookip.includes(props.property.type)
  ) {
    return (
      <ConstantLikeEnumDescription
        constant={props.property.enumeration[0]}
        apiKey={props.apiKey}
        apiType={props.property.type}
      />
    );
  }

  const additionalInfos = extractAdditionalInfo(props.property);
  const renderEnums = props.property.enumeration && !props.discriminatorValue;
  return (
    <SpacingsStack scale="s">
      <DescriptionText>
        {markdownFragmentToReact(props.property.description)}
      </DescriptionText>
      <SpacingsInline>
        {renderEnums ? (
          <Info>
            Value must be one of: {props.property.enumeration.join(', ')}
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
Description.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.object.isRequired,
  discriminatorValue: PropTypes.string,
};

export default Description;
