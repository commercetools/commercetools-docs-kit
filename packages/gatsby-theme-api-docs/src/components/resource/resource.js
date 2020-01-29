import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import useReadResourceByResourcePath from '../../hooks/use-read-resource-by-resource-path';
import doIfMissingInApi from '../../utils/do-if-missing-in-api';
import Method from './method';

const Resource = ({ apiKey, resource }) => {
  const resourceObj = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObj) {
    return doIfMissingInApi(
      `Resource '${resource}' not found in '${apiKey}' API`
    );
  }

  const methods = ['post', 'get', 'delete'];

  return (
    <SpacingsStack scale="xl">
      {methods.map(method => {
        return resourceObj[method] ? (
          <Method
            key={method}
            apiKey={resourceObj.apiKey}
            uris={resourceObj.uris}
            resourceUriParameters={resourceObj.allUriParameters}
            method={resourceObj[method]}
            methodType={method}
          />
        ) : null;
      })}
    </SpacingsStack>
  );
};

Resource.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};

export default Resource;
