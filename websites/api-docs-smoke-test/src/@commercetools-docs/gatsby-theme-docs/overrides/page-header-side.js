import React from 'react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { UserResearchBanner } from '@commercetools-docs/gatsby-theme-docs';
import GitHubIcon from '../../../icons/github.svg';

// A React component to be rendered in the top-right corner of a content page
// eslint-disable-next-line react/display-name
export default () => {
  return (
    <SpacingsStack size="m">
      <div>
        <GitHubIcon />
      </div>
      <UserResearchBanner />
    </SpacingsStack>
  );
};
