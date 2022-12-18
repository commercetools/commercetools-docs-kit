import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { tokens, dimensions, typography } from '../../../design-system';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import Title from './title';

const ResponseCode = styled.span`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${designSystem.colors.light.surfacePrimary};
  padding: ${dimensions.spacings.xxs} ${designSystem.dimensions.spacings.s};
  border-radius: ${tokens.borderRadiusForResponseCode};
  line-height: ${typography.lineHeights.responseCode};
`;

const LinkContainer = styled.span`
  margin-left: ${designSystem.dimensions.spacings.s};
  line-height: ${typography.lineHeights.responseBodyType};
`;

const Responses = ({ apiKey, responses }) => {
  const typeLocations = useTypeLocations();

  return (
    <SpacingsStack scale="xs">
      <Title>Response:</Title>
      <SpacingsStack scale="s">
        {responses.map((response) => {
          return (
            <p key={response.code}>
              <ResponseCode
                css={computeStatusCodeBackgroundColor(response.code)}
              >
                {response.code}
              </ResponseCode>
              <LinkContainer>
                {response.body
                  ? renderTypeAsLink(
                      apiKey,
                      response.body.applicationjson.type,
                      typeLocations,
                      response.description
                    )
                  : response.description || 'No body is returned.'}
              </LinkContainer>
            </p>
          );
        })}
      </SpacingsStack>
    </SpacingsStack>
  );
};

function computeStatusCodeBackgroundColor(code) {
  const parsed = parseInt(code, 10);

  if (parsed >= 400 && parsed < 500) {
    return css`
      background-color: #f16d0e;
    `;
  }

  if (parsed >= 500) {
    return css`
      background-color: #e60050;
    `;
  }

  return css`
    background-color: #00ccb4;
  `;
}

Responses.propTypes = {
  apiKey: PropTypes.string.isRequired,
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      body: PropTypes.object,
    })
  ).isRequired,
};

export default Responses;
