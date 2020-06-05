import React from 'react';
import PropTypes from 'prop-types';
import ResourceMethod from './resource-method';

const Endpoint = ({ apiKey, resource, method, title }) => (
  <ResourceMethod
    apiKey={apiKey}
    resource={resource}
    method={method}
    title={title}
  />
);

Endpoint.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Endpoint;
