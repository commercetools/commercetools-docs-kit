import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem, createStyledIcon } from '@commercetools-docs/ui-kit';
import { MailIcon } from '@commercetools-uikit/icons';
import UnstyledRssIcon from '../icons/rss.svg';
import Link from './link';

const RssIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${designSystem.dimensions.spacings.m};
  height: ${designSystem.dimensions.spacings.m};
`;

const RssIcon = createStyledIcon(UnstyledRssIcon);

const Container = styled.div`
  margin-top: ${designSystem.dimensions.spacings.m};
  padding-left: ${designSystem.dimensions.spacings.m};
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};
`;

const linkStyles = css`
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
  <Container>
    <SpacingsStack scale="xs">
      <Link href="/releases/feed.xml" css={linkStyles} noUnderline={true}>
        <SpacingsInline scale="xs" alignItems="baseline">
          <RssIconContainer>
            <RssIcon size="small" />
          </RssIconContainer>
          <span>RSS</span>
        </SpacingsInline>
      </Link>
      <Link
        href="https://ok.commercetools.com/product-newsletter"
        css={[linkStyles]}
        noUnderline={true}
      >
        <SpacingsInline scale="xs" alignItems="baseline">
          <MailIcon size="medium" />
          <span>Product Newsletter</span>
        </SpacingsInline>
      </Link>
    </SpacingsStack>
  </Container>
);

export default ReleaseNotesSubscribeLinks;
