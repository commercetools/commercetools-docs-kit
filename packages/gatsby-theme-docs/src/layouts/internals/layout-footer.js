import React from 'react';
import { css } from '@emotion/core';
import Footer from './footer';

const LayoutFooter = () => (
  <div
    css={css`
      grid-area: footer;
    `}
  >
    <Footer />
  </div>
);

export default LayoutFooter;
