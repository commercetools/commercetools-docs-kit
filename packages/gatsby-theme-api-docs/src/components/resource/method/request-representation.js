import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import ApiType from '../../type';
import Title from './title';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();
  const requestRepresentationLocation = locationForType(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  return (
    <SpacingsStack scale="xs">
      <Title>Request Body:</Title>
      {requestRepresentationLocation ? (
        renderTypeAsLink(props.apiKey, props.apiType, typeLocations)
      ) : (
        <ApiType
          apiKey={props.apiKey}
          type={props.apiType}
          renderDescriptionBelowProperties
          doNotRenderExamples
        />
      )}
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
};

export default RequestRepresentation;
