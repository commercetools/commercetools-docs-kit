import React from 'react';
import PropTypes from 'prop-types';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';

import Title from './title';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();

  return (
    <SpacingsInline>
      <Title>Request Body:</Title>{' '}
      {renderTypeAsLink(props.apiKey, props.apiType, typeLocations)}
    </SpacingsInline>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
};

export default RequestRepresentation;
