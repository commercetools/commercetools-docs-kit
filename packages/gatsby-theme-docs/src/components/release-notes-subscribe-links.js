import React from 'react';
import { css } from '@emotion/core';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import { MailIcon } from '@commercetools-uikit/icons';
import RssSvg from '../icons/rss.svg';
import Link from './link';

const linkStyles = css`
  color: ${designSystem.colors.light.textSecondary} !important;
  font-size: ${designSystem.typography.fontSizes.body};
  line-height: ${designSystem.typography.lineHeights.body};

  svg {
    width: 16px;
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
    <Link href="/releases/feed.xml" css={linkStyles} noUnderline={true}>
      <SpacingsInline scale="xs" alignItems="baseline">
        <RssSvg />
        <span>RSS</span>
      </SpacingsInline>
    </Link>
    <Link href="#" css={linkStyles} noUnderline={true}>
      <SpacingsInline scale="xs" alignItems="baseline">
        <MailIcon size="medium" />
        <span>Product Newsletter</span>
      </SpacingsInline>
    </Link>
  </SpacingsStack>
);

export default ReleaseNotesSubscribeLinks;
