import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import ApiTypeByKey from '../../type/type-by-api-key';
import Title from './title';
import { getDescriptionIfPrimitiveType } from '../../type/type';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();
  const requestRepresentationLocation = locationForType(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  let primitiveJSONType;

  if (
    !requestRepresentationLocation &&
    props.contentType &&
    props.contentType.includes('application/json')
  ) {
    primitiveJSONType = getDescriptionIfPrimitiveType(
      'application/json',
      props.apiType
    );
  }

  const ContentTypeRow = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    span {
      margin-right: ${designSystem.dimensions.spacings.s};
    }
  `;

  const requestDetails = renderTypeAsLink(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  return (
    <SpacingsStack scale="xs">
      <Title>Request Body:</Title>
      {!props.isStructuredDataType ? (
        <SpacingsInline alignItems="center">
          {props.contentType.map((type, index) => {
            return (
              <ContentTypeRow key={index}>
                {index !== 0 && <span>or</span>}
                <Markdown.InlineCodeWithoutBox>
                  {type}
                </Markdown.InlineCodeWithoutBox>
                {index === props.contentType.length - 1 && <p>.</p>}
              </ContentTypeRow>
            );
          })}
          <span>The file to upload</span>
        </SpacingsInline>
      ) : requestRepresentationLocation || primitiveJSONType ? (
        <SpacingsInline alignItems="center">
          {primitiveJSONType ? (
            <Markdown.Em>{primitiveJSONType}</Markdown.Em>
          ) : requestDetails === props.apiType ? (
            <p>{requestDetails}</p>
          ) : (
            requestDetails
          )}
          <span>as</span>
          <Markdown.InlineCodeWithoutBox>
            {props.contentType}
          </Markdown.InlineCodeWithoutBox>
        </SpacingsInline>
      ) : (
        <SpacingsStack>
          <Markdown.InlineCodeWithoutBox>
            {props.contentType}
          </Markdown.InlineCodeWithoutBox>
          <ApiTypeByKey
            contentType={props.contentType}
            apiKey={props.apiKey}
            type={props.apiType}
            doNotRenderExamples
          />
        </SpacingsStack>
      )}
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string,
  isStructuredDataType: PropTypes.bool.isRequired,
  contentType: PropTypes.array.isRequired,
};

export default RequestRepresentation;
