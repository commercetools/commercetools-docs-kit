import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { useReadMethodOfResourceByResourcePath } from '../../hooks/use-api-resources';
import Method from './resource/method';

const Container = styled.div`
  margin: 1em 0;
`;

const ResourceMethod = ({ apiKey, resource, method }) => {
  const urlMethod = useReadMethodOfResourceByResourcePath(
    apiKey,
    resource,
    method
  );

  return (
    <Container>
      <Method apiKey={apiKey} {...urlMethod} />
    </Container>
  );
};

ResourceMethod.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default ResourceMethod;
