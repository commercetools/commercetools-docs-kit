import React from 'react';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';
import Footer from './footer';

const LayoutFooter = () => (
  <div
    css={css`
      grid-area: footer;
      box-shadow: ${designSystem.tokens.shadowForFooter};
    `}
  >
    <Footer />
  </div>
);

export default LayoutFooter;
