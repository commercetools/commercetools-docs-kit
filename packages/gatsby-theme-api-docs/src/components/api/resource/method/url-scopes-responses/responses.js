import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';
import { tokens, dimensions, typography } from '../../../../../design-system';

import { useTypeLocations } from '../../../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../../../utils/render-type-as-link';
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
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: ${typography.lineHeights.responseBodyType};
`;

const Responses = ({ apiKey, responses, title }) => {
  const typeLocations = useTypeLocations();

  return (
    <div>
      {title ? <Title>{title}</Title> : null}

      {responses.map(response => {
        return (
          <p key={response.code}>
            <ResponseCode css={computeStatusCodeBackgroundColor(response.code)}>
              {response.code}
            </ResponseCode>
            <LinkContainer>
              {response.body
                ? renderTypeAsLink(
                    apiKey,
                    response.body.applicationjson.type,
                    typeLocations
                  )
                : 'No body is returned.'}
            </LinkContainer>
          </p>
        );
      })}
    </div>
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
  title: PropTypes.string,
};

export default Responses;
