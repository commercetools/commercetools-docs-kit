import React from 'react';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';
import Footer from './footer';

const LayoutFooter = () => (
  <div
    css={css`
      box-shadow: ${designSystem.tokens.shadow6};
    `}
  >
    <Footer />
  </div>
);

export default LayoutFooter;
