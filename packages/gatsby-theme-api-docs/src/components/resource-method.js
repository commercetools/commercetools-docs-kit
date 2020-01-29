import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import useReadResourceByResourcePath from '../hooks/use-read-resource-by-resource-path';
import doIfMissingResource from '../utils/do-if-missing-resource';
import Method from './resource/method';

const Container = styled.div`
  margin: 1em 0;
`;

const ResourceMethod = ({ apiKey, resource, method }) => {
  const resourceObject = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObject) {
    return doIfMissingResource(apiKey, resource);
  }

  const methodObject = resourceObject[method.toLowerCase()];

  if (!methodObject) {
    return doIfMissingResourceMethod(apiKey, resource, method);
  }

  return (
    <Container>
      <Method
        apiKey={apiKey}
        uris={resourceObject.uris}
        resourceUriParameters={resourceObject.allUriParameters}
        method={methodObject}
        methodType={method}
      />
    </Container>
  );
};

function doIfMissingResourceMethod(apiKey, resource, method) {
  const errorMsg = `Method '${method}' of resource '${resource}' not found in '${apiKey}' API`;

  if (__DEVELOPMENT__) {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

ResourceMethod.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default ResourceMethod;
