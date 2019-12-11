import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useReadResourceByResourcePath } from '../../../hooks/use-api-resources';
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

  return (
    <ResourceContainer>
      {resourceObj.methods.map(method => {
        return (
          <MethodContainer key={method.method}>
            <Method
              apiKey={apiKey}
              url={resourceObj.absoluteUri}
              method={method}
            />
          </MethodContainer>
        );
      })}
    </ResourceContainer>
  );
};

Resource.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};

export default Resource;
