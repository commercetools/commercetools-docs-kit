import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import ApiType from '../../type';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';

import Title from './title';

const RequestRepresentation = ({ apiKey, apiType }) => {
  const typeLocations = useTypeLocations();
  const notDefinedElsewhere =
    typeof locationForType(apiKey, apiType, typeLocations) === 'undefined';
  const title = (
    <SpacingsInline>
      <Title>Request Body:</Title>{' '}
      {renderTypeAsLink(apiKey, apiType, typeLocations)}
    </SpacingsInline>
  );
  return (
    <SpacingsStack scale="s">
      {title}
      {notDefinedElsewhere && (
        <ApiType
          apiKey={apiKey}
          type={apiType}
          renderDescriptionBelowProperties={true}
          renderExamples={false}
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
