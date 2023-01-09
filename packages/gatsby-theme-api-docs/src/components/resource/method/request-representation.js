import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import { dimensions } from '../../../design-system';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import ApiTypeByKey from '../../type/type-by-api-key';
import Title from './title';
import ContentType from './highlights';

const BodyTitleContainer = styled.div`
  display: flex;
  align-items: center;
  span:first-of-type {
    padding-right: ${dimensions.spacings.l};
  }
`;

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();
  const requestRepresentationLocation = locationForType(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  return (
    <SpacingsStack scale="xs">
      <BodyTitleContainer>
        <Title>Request Body:</Title>
        <ContentType>{props.contentType}</ContentType>
      </BodyTitleContainer>
      {!props.isStructuredDataType ? (
        <Title>The file to upload</Title>
      ) : requestRepresentationLocation ? (
        renderTypeAsLink(props.apiKey, props.apiType, typeLocations)
      ) : (
        <ApiTypeByKey
          apiKey={props.apiKey}
          type={props.apiType}
          doNotRenderExamples
        />
      )}
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string,
  isStructuredDataType: PropTypes.bool.isRequired,
  contentType: PropTypes.string.isRequired,
};

export default RequestRepresentation;
