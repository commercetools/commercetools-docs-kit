import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { designSystem } from '@commercetools-docs/ui-kit';
import { tokens, typography } from '../../../design-system';

const Container = styled.span`
  display: flex;
  align-items: flex-start;
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    flex-wrap: wrap;
  }
`;
const BasePath = styled.span`
  color: ${designSystem.colors.light.textSecondary};
  display: inline-block;
`;
const ResourceUriPath = styled.span`
  font-weight: ${designSystem.typography.fontWeights.bold};
  display: inline-block;
`;
const Type = styled.span`
  display: inline-block;
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: ${typography.lineHeights.methodType};
  color: ${designSystem.colors.light.surfacePrimary};
  padding: 0 ${designSystem.dimensions.spacings.s};
  border-radius: ${tokens.borderRadiusForMethodType};
  text-transform: uppercase;
  margin-right: ${designSystem.dimensions.spacings.s};
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

const Url = ({ method, methodColor, uris }) => {
  return (
    <>
      <Container>
        <Type
          css={css`
            background-color: ${methodColor};
          `}
        >
          {method}
        </Type>
        <p>
          <BasePath>
            <SlashWrappingPath>
              {uris.baseUri.replace(/^(https:\/\/)/, '')}
            </SlashWrappingPath>
          </BasePath>
          <ResourceUriPath>
            <SlashWrappingPath>{uris.resourcePathUri}</SlashWrappingPath>
          </ResourceUriPath>
        </p>
      </Container>
    </>
  );
};

Url.propTypes = {
  method: PropTypes.string.isRequired,
  methodColor: PropTypes.string.isRequired,
  uris: PropTypes.shape({
    baseUri: PropTypes.string.isRequired,
    resourcePathUri: PropTypes.string.isRequired,
  }).isRequired,
};

export default Url;
