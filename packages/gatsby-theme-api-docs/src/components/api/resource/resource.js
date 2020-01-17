import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import useReadResourceByResourcePath from '../../../hooks/use-read-resource-by-resource-path';
import Method from './method';

const ResourceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const MethodContainer = styled.div`
  margin: 1rem 0;
`;

const Resource = ({ apiKey, resource }) => {
  const resourceObj = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObj) {
    return (
      <ContentNotifications.Error>{`Resource '${resource}' not found in API`}</ContentNotifications.Error>
    );
  }

  return <ResourceContainer>{renderMethods(resourceObj)}</ResourceContainer>;
};

function renderMethods(resource) {
  const methods = ['post', 'get', 'delete'];

  return (
    <>
      {methods.map(method => {
        return resource[method] ? (
          <MethodContainer key={method}>
            <Method
              apiKey={resource.apiKey}
              uris={resource.uris}
              resourceUriParameters={resource.allUriParameters}
              method={resource[method]}
              methodType={method}
            />
          </MethodContainer>
        ) : null;
      })}
    </>
  );
}

Resource.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};

export default Resource;
