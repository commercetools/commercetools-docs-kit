import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import ApiType from '../../type';

const RequestRepresentation = ({ titleSuffix, apiKey, apiType }) => {
  return (
    <SpacingsStack scale="s">
      <p>
        {titleSuffix ? `${titleSuffix}: ` : null}
        <strong>{apiType}</strong>
      </p>

      <ApiType apiKey={apiKey} type={apiType} />
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  titleSuffix: PropTypes.string,
};

export default RequestRepresentation;
