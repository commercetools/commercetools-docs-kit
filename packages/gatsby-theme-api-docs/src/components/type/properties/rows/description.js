import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import {
  Markdown,
  designSystem,
  useISO310NumberFormatter,
} from '@commercetools-docs/ui-kit';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import extractAdditionalInfo from '../../../../utils/extract-additional-info';
import capitalizeFirst from '../../../../utils/capitalize-first';
import { useApiTypeByApiKeyAndDisplayName } from '../../../../hooks/use-api-types';
import { DescriptionText } from '../../../description';
import Info from '../../../info';

const customCodeStyle = css`
  font-size: ${designSystem.typography.fontSizes.small};
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
      {description && <DescriptionText markdownString={description} />}
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
  const formatNumber = useISO310NumberFormatter();

  switch (valueType) {
    case 'boolean':
      return value ? (
        ''
      ) : (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            No
          </Markdown.InlineCodeWithoutBox>
        </>
      );
    case 'number':
      return (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            {formatNumber(value)}
          </Markdown.InlineCodeWithoutBox>
        </>
      );
    default:
      return (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            {value}
          </Markdown.InlineCodeWithoutBox>
        </>
      );
  }
};
InfoValue.propTypes = {
  children: PropTypes.any.isRequired,
};
const AdditionalInfo = (props) => {
  const additionalInfos = extractAdditionalInfo(props.property);
  return (
    <>
      {additionalInfos.map((info, index) => {
        return (
          !(typeof value === 'boolean' && !info.value) && (
            <Info key={index}>
              {capitalizeFirst(info.name)}
              <InfoValue>{info.value}</InfoValue>
              {'\u200B' /* zero-width space for the search crawler */}
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

  const renderEnums = props.property.enumeration;
  return (
    <SpacingsStack scale="s">
      <DescriptionText markdownString={props.property.description} />
      <SpacingsInline>
        {renderEnums ? (
          <Info>
            Can be{' '}
            {props.property.enumeration.map((currentEnum, index) => {
              return index === props.property.enumeration.length - 1 ? (
                <React.Fragment key={currentEnum}>
                  or{' '}
                  <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
                    {generateAppropriatePrimitiveText(
                      props.property.type,
                      currentEnum
                    )}
                  </Markdown.InlineCodeWithoutBox>
                </React.Fragment>
              ) : (
                <React.Fragment key={currentEnum}>
                  <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
                    {generateAppropriatePrimitiveText(
                      props.property.type,
                      currentEnum
                    )}
                  </Markdown.InlineCodeWithoutBox>
                  ,{' '}
                </React.Fragment>
              );
            })}
            {'\u200B' /* zero-width space for the search crawler */}
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
