import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { responseRepresentation } from '../../../../../utils/constants';
import Scopes from './scopes';
import Responses from './responses';

const ScopeContainer = styled.div`
  margin: 1rem 0;
`;

const UrlScopesResponses = ({ data }) => {
  const { url, scopes, responses } = data;
  return (
    <div>
      <p>{url}</p>

      {scopes.scopes ? (
        <ScopeContainer>
          <Scopes scopes={scopes.scopes} title={scopes.title} />
        </ScopeContainer>
      ) : null}

      {responses ? (
        <Responses responses={responses} title={responseRepresentation} />
      ) : null}
    </div>
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
