import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import { tokens, typography } from '../../../../design-system';

import { responseRepresentation } from '../../../../utils/constants';
import Scopes from './scopes';
import Responses from './responses';

const BasePath = styled.span`
  color: ${designSystem.colors.light.textFaded};
  display: inline-block;
`;
const ResourceUriPath = styled.span`
  font-weight: ${designSystem.typography.fontWeights.bold};
  display: inline-block;
`;
const Type = styled.span`
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: ${typography.lineHeights.methodType};
  color: ${designSystem.colors.light.surfacePrimary};
  padding: 0 ${designSystem.dimensions.spacings.s};
  border-radius: ${tokens.borderRadiusForMethodType};
  text-transform: uppercase;
`;
const PathFragment = styled.span`
  display: inline-block;
`;
const SlashWrappingPath = (props) => {
  return props.children.split('/').map((segment, index) => {
    return (
      <PathFragment key={index}>
        {index > 0 && '/'}
        {segment}
      </PathFragment>
    );
  });
};

const UrlScopesResponses = ({
  apiKey,
  method,
  methodColor,
  uris,
  scopes,
  responses,
}) => {
  return (
    <>
      <SpacingsInline>
        <Type
          css={css`
            background-color: ${methodColor};
          `}
        >
          {method}
        </Type>
        <p>
          <BasePath>
            <SlashWrappingPath>{uris.baseUri}</SlashWrappingPath>
          </BasePath>
          <ResourceUriPath>
            <SlashWrappingPath>{uris.resourcePathUri}</SlashWrappingPath>
          </ResourceUriPath>
        </p>
      </SpacingsInline>

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
    </>
  );
};

UrlScopesResponses.propTypes = {
  apiKey: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  methodColor: PropTypes.string.isRequired,
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
