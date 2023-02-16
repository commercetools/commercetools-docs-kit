import React from 'react';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import Link from './link';

const linkStyles = css`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: 1.75;
  color: ${designSystem.colors.light.textPrimary} !important;

  svg {
    fill: ${designSystem.colors.light.textPrimary} !important;
  }

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      fill: ${designSystem.colors.light.linkNavigation} !important;
    }
  }
`;

const GlobalNavigationLink = (props) => (
  <Link {...props} css={linkStyles} nounderline={true} />
);

export default GlobalNavigationLink;
