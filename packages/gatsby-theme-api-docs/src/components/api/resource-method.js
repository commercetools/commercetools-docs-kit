import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import { useReadResourceByResourcePath } from '../../hooks/use-api-resources';
import Method from './resource/method';

const Container = styled.div`
  margin: 1em 0;
`;

const ResourceMethod = ({ apiKey, resource, method }) => {
  const resourceObject = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObject) {
    return (
      <ContentNotifications.Error>{`Resource '${resource}' not found in API`}</ContentNotifications.Error>
    );
  }

  const methodObject = resourceObject[method.toLowerCase()];

  if (!methodObject) {
    return (
      <ContentNotifications.Error>{`Method '${method}' of resource '${resource}' not found in API`}</ContentNotifications.Error>
    );
  }

  return (
    <Container>
      <Method
        apiKey={apiKey}
        url={resourceObject.resourcePathUri}
        resourceUriParameters={resourceObject.uriParameters}
        method={methodObject}
        methodType={method}
      />
    </Container>
  );
};

ResourceMethod.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default ResourceMethod;
