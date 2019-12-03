import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import LogoSvg from '../../icons/logo.svg';
import { ExternalSiteLink } from '../../components/link';
import { colors, dimensions, typography } from '../../design-system';

const FooterExternalLink = styled(ExternalSiteLink)`
  font-size: ${typography.fontSizes.small};
  color: ${colors.light.textPrimary} !important;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const LayoutFooter = () => (
  <div
    css={css`
      background-color: ${colors.light.surfaceSecondary2};
      padding: ${dimensions.spacings.m};

      @media screen and (${dimensions.viewports.tablet}) {
        padding: ${dimensions.spacings.xl};
      }
    `}
  >
    <SpacingsInline alignItems="center" justifyContent="space-between">
      <SpacingsInline scale="m" alignItems="center">
        <LogoSvg height={32} />
        <div
          css={css`
            font-size: ${typography.fontSizes.small};
          `}
        >
          &copy;{` ${new Date().getFullYear()} commercetools`}
        </div>
      </SpacingsInline>
      <div>
        <FooterExternalLink href="https://commercetools.com/privacy">
          {'Privacy Policy'}
        </FooterExternalLink>
        {` | `}
        <FooterExternalLink href="https://commercetools.com/privacy">
          {'Imprint'}
        </FooterExternalLink>
      </div>
    </SpacingsInline>
  </div>
);

export default LayoutFooter;
