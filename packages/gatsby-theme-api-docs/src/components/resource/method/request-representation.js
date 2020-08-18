import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';

import Title from './title';

const RequestRepresentation = ({ apiKey, apiType }) => {
  const typeLocations = useTypeLocations();

  return (
    <SpacingsStack scale="s">
      <SpacingsInline>
        <Title>Request Body:</Title>{' '}
        {renderTypeAsLink(apiKey, apiType, typeLocations)}
      </SpacingsInline>

      <div>Code example</div>
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
};

export default RequestRepresentation;
