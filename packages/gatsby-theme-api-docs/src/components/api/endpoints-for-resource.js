import React from 'react';
import PropTypes from 'prop-types';

import Resource from './resource';

const EndpointsForResource = ({ apiKey, resource }) => (
  <Resource apiKey={apiKey} resource={resource} />
);

EndpointsForResource.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};

export default EndpointsForResource;
