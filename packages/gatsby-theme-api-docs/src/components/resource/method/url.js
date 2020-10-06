import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import { tokens, typography } from '../../../design-system';

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
`;
const PathFragment = styled.span`
  display: inline-block;
  word-break: break-word;
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
    <SpacingsInline scale="xs">
      <Type
        css={css`
          background-color: ${methodColor};
        `}
      >
        {method}
      </Type>
      <SpacingsStack scale="xs">
        <BasePath>
          <SlashWrappingPath>{uris.baseUri}</SlashWrappingPath>
        </BasePath>
        <ResourceUriPath>
          <SlashWrappingPath>{uris.resourcePathUri}</SlashWrappingPath>
        </ResourceUriPath>
      </SpacingsStack>
    </SpacingsInline>
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
