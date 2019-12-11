import React from 'react';
import { css } from '@emotion/core';

export const Table = props => (
  <table
    css={css`
      width: 100%;
      max-width: 100%;
      background-color: transparent;
      border-spacing: 2px;
    `}
    {...props}
  />
);

export const Th = props => (
  <th
    css={css`
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
      border-top: 1px solid #dee2e6;
      padding: 0.3rem;
      text-align: left;
    `}
    {...props}
  />
);

export const Td = props => (
  <td
    css={css`
      padding: 0.3rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    `}
    {...props}
  />
);
