import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import ApiTypeByKey from '../../type/type-by-api-key';
import Title from './title';
import ContentType from './highlights';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();
  const requestRepresentationLocation = locationForType(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  return (
    <SpacingsStack scale="xs">
      <SpacingsInline scale="xs">
        <Title>Request Body:</Title>
        <ContentType>{props.contentType}</ContentType>
      </SpacingsInline>
      {props.isImage ? (
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
  isImage: PropTypes.bool.isRequired,
  contentType: PropTypes.string.isRequired,
};

export default RequestRepresentation;
