import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

import { responseRepresentation } from '../../../../../utils/constants';
import Scopes from './scopes';
import Responses from './responses';

const Container = styled.div`
  padding: ${customProperties.spacingM};
`;

const ScopeContainer = styled.div`
  margin-top: ${customProperties.spacingM};
`;

const ResponsesContainer = styled.div`
  margin-top: ${customProperties.spacingM};
`;

const UrlScopesResponses = ({ data }) => {
  const { url, scopes, responses } = data;
  return (
    <Container>
      <p>{url}</p>

      {scopes.scopes ? (
        <ScopeContainer>
          <Scopes scopes={scopes.scopes} title={scopes.title} />
        </ScopeContainer>
      ) : null}

      {responses ? (
        <ResponsesContainer>
          <Responses responses={responses} title={responseRepresentation} />
        </ResponsesContainer>
      ) : null}
    </Container>
  );
};

UrlScopesResponses.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    scopes: PropTypes.shape({
      title: PropTypes.string,
      scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
    }).isRequired,
    responses: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        body: PropTypes.object,
      })
    ),
  }),
};

export default UrlScopesResponses;
