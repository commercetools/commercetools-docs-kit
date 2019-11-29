import React from 'react';
import { css } from '@emotion/core';
import { tokens } from '../../design-system';
import Footer from './footer';

const LayoutFooter = () => (
  <div
    css={css`
      box-shadow: ${tokens.shadow6};
    `}
  >
    <Footer />
  </div>
);

export default LayoutFooter;
