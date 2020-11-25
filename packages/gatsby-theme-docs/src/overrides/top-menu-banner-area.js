import React from 'react';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';
import UserResearchBanner from '../components/user-research-banner';

// A React component to be rendered on the right side of the top-menu
// eslint-disable-next-line react/display-name
export default () => {
  return (
    <div>
      <div
        css={css`
          margin-top: ${designSystem.dimensions.spacings.m};
        `}
      >
        <UserResearchBanner />
      </div>
    </div>
  );
};
