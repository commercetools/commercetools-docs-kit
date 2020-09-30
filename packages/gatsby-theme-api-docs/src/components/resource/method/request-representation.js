import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import ApiType from '../../type';
import { Title } from './styled-components';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();
  const requestRepresentationLocation = locationForType(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  return (
    <SpacingsStack scale="s">
      <SpacingsInline>
        <Title>Request Body:</Title>{' '}
        {renderTypeAsLink(props.apiKey, props.apiType, typeLocations)}
      </SpacingsInline>

      {!requestRepresentationLocation && (
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
