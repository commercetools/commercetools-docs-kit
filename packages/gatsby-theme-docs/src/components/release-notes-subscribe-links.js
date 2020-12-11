import React from 'react';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem, createStyledIcon } from '@commercetools-docs/ui-kit';
import { MailIcon } from '@commercetools-uikit/icons';
import { RssSvgIcon } from '../icons';
import { ExternalSiteLink } from './link';

const RssIcon = createStyledIcon(RssSvgIcon);

const linkStyles = css`
  text-decoration: none;
  color: ${designSystem.colors.light.textSecondary} !important;
  font-size: ${designSystem.typography.fontSizes.body};
  line-height: ${designSystem.typography.lineHeights.body};

  svg {
    * {
      fill: ${designSystem.colors.light.surfaceSecondary3} !important;
    }
  }

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;

    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation} !important;
      }
    }
  }
`;

const ReleaseNotesSubscribeLinks = () => (
  <SpacingsStack scale="xs">
    <ExternalSiteLink href={withPrefix('/releases/feed.xml')} css={linkStyles}>
      <SpacingsInline scale="xs" alignItems="center">
        <RssIcon size="medium" />
        <span>RSS</span>
      </SpacingsInline>
    </ExternalSiteLink>
    <ExternalSiteLink
      href="https://ok.commercetools.com/product-newsletter"
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
