import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';

import { responseRepresentation } from '../../../../utils/constants';
import Scopes from './scopes';
import Responses from './responses';

const Container = styled.div`
  padding: ${designSystem.dimensions.spacings.m};
`;
const BasePath = styled.span`
  color: ${designSystem.colors.light.textFaded};
`;
const ResourceUriPath = styled.span`
  font-weight: ${designSystem.typography.fontWeights.bold};
`;

const UrlScopesResponses = ({ apiKey, uris, scopes, responses }) => {
  return (
    <Container>
      <SpacingsStack scale="m">
        <p>
          <BasePath>{uris.baseUri}</BasePath>
          <ResourceUriPath>{uris.resourcePathUri}</ResourceUriPath>
        </p>

        {scopes.scopes ? (
          <Scopes scopes={scopes.scopes} title={scopes.title} />
        ) : null}

        {responses ? (
          <Responses
            apiKey={apiKey}
            responses={responses}
            title={responseRepresentation}
          />
        ) : null}
      </SpacingsStack>
    </Container>
  );
};

UrlScopesResponses.propTypes = {
  apiKey: PropTypes.string.isRequired,
  uris: PropTypes.shape({
    baseUri: PropTypes.string.isRequired,
    resourcePathUri: PropTypes.string.isRequired,
  }).isRequired,
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
};

export default UrlScopesResponses;
