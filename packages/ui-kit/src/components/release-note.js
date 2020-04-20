import React from 'react';
import { css } from '@emotion/core';
import { H1 as MarkdownH1, H3 as MarkdownH3 } from './markdown';
import { typography, dimensions } from '../design-system';

const H1 = (props) => (
  <MarkdownH1
    {...props}
    css={css`
      font-size: ${typography.fontSizes.h3};
      font-weight: ${typography.fontWeights.bold};
      margin: ${dimensions.spacings.big} 0 0;
      color: unset;
    `}
  />
);

const H3 = (props) => (
  <MarkdownH3
    {...props}
    css={css`
      font-weight: ${typography.fontWeights.bold};
    `}
  />
);

export { H1, H3 };
