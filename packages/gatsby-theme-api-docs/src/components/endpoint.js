import React from 'react';
import PropTypes from 'prop-types';
import ResourceMethod from './resource-method';

const Endpoint = ({ apiKey, resource, method }) => (
  <ResourceMethod apiKey={apiKey} resource={resource} method={method} />
);

Endpoint.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default Endpoint;
