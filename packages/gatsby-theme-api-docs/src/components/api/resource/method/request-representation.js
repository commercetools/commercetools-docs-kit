import React from 'react';
import PropTypes from 'prop-types';
import ApiType from '../../type';

const RequestRepresentation = ({ titleSuffix, apiKey, apiType }) => {
  return (
    <div>
      <p>
        <strong>
          {titleSuffix ? `${titleSuffix} -` : null} {apiType}
        </strong>
      </p>

      <ApiType apiKey={apiKey} type={apiType} />
    </div>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  titleSuffix: PropTypes.string,
};

export default RequestRepresentation;
