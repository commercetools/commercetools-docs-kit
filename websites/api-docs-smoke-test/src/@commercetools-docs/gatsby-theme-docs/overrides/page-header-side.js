import React from 'react';
import css from '@emotion/css';
import { designSystem } from '@commercetools-docs/ui-kit';
import { UserResearchBanner } from '@commercetools-docs/gatsby-theme-docs';
import GitHubIcon from '../../../icons/github.svg';

// A React component to be rendered in the top-right corner of a content page
// eslint-disable-next-line react/display-name
export default () => {
  return (
    <div>
      <div
        css={css`
          padding-bottom: ${designSystem.dimensions.spacings.m};
        `}
      >
        <GitHubIcon />
      </div>
      <UserResearchBanner />
    </div>
  );
};
