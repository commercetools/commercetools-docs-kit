import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useReadResourceByResourcePath from '../hooks/use-read-resource-by-resource-path';
import reportError from '../utils/report-error';
import Method from './resource/method';

const Container = styled.div`
  margin: 1em 0;
`;

const ResourceMethod = ({ apiKey, resource, method, title }) => {
  const resourceObject = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObject) {
    return reportError(`Resource '${resource}' not found in '${apiKey}' API`);
  }

  const methodObject = resourceObject[method.toLowerCase()];

  if (!methodObject) {
    return reportError(
      `Method '${method}' of resource '${resource}' not found in '${apiKey}' API`
    );
  }

  return (
    <Container>
      <Method
        apiKey={apiKey}
        uris={resourceObject.uris}
        resourceUriParameters={resourceObject.allUriParameters}
        method={methodObject}
        methodType={method}
        title={title}
      />
    </Container>
  );
};

ResourceMethod.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ResourceMethod;
