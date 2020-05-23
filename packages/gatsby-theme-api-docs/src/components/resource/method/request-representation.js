import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import ApiType from '../../type';
import { requestRepresentation } from '../../../utils/constants';
import TableTopic from './table-topic';

const RequestRepresentation = ({ apiKey, apiType }) => {
  const title = (
    <p>
      <TableTopic>{requestRepresentation}:</TableTopic>
      {apiType}
    </p>
  );
  return (
    <SpacingsStack scale="s">
      <ApiType
        apiKey={apiKey}
        type={apiType}
        renderDescriptionBelowProperties={true}
        propertiesTableTitle={title}
      />
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
};

export default RequestRepresentation;
