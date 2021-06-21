import React from 'react';
import PropTypes from 'prop-types';
import { useReadResourceByResourcePath } from '../../hooks/use-read-resource-by-resource-path';
import Resource from './resource';
import reportError from '../../utils/report-error';

const ResourceByKey = ({ apiKey, resource }) => {
  const resourceObj = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObj) {
    return reportError(`Resource '${resource}' not found in '${apiKey}' API`);
  }

  return <Resource resourceObj={resourceObj} />;
};

ResourceByKey.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};
export default ResourceByKey;
