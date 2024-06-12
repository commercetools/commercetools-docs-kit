import React from 'react';
import { css } from '@emotion/react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import { MailIcon } from '@commercetools-uikit/icons';
import { ExternalSiteLink } from './link';

const linkStyles = css`
  text-decoration: none;
  color: ${designSystem.colors.light.textSecondary} !important;
  font-size: ${designSystem.typography.fontSizes.body};
  line-height: ${designSystem.typography.lineHeights.body};

  svg {
    fill: ${designSystem.colors.light.surfaceSecondary3} !important;
  }

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      fill: ${designSystem.colors.light.linkNavigation} !important;
    }
  }
`;

const ReleaseNotesSubscribeLinks = () => (
  <SpacingsStack scale="xs">
    <ExternalSiteLink
      href="https://commercetools.com/newsletter/product"
      css={linkStyles}
    >
      <SpacingsInline scale="xs" alignItems="center">
        <MailIcon size="medium" />
        <span>Product Newsletter</span>
      </SpacingsInline>
    </ExternalSiteLink>
  </SpacingsStack>
);

export default ReleaseNotesSubscribeLinks;
