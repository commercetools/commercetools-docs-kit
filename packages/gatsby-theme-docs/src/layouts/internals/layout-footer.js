import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import LogoSvg from '../../icons/logo.svg';
import { Spacings } from '../../components';
import { ExternalSiteLink } from '../../components/link';
import { colors, dimensions, tokens, typography } from '../../design-system';

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
      box-shadow: ${tokens.shadow6};
      background-color: ${colors.light.surfaceSecondary2};
      padding: ${dimensions.spacings.m};

      @media screen and (${dimensions.viewports.tablet}) {
        padding: ${dimensions.spacings.xl};
      }
    `}
  >
    <Spacings.Inline alignItems="center" justifyContent="space-between">
      <Spacings.Inline scale="m" alignItems="center">
        <LogoSvg height={32} />
        <div
          css={css`
            font-size: ${typography.fontSizes.small};
          `}
        >
          &copy;{` ${new Date().getFullYear()} commercetools`}
        </div>
      </Spacings.Inline>
      <div>
        <FooterExternalLink href="https://commercetools.com/privacy">
          {'Privacy Policy'}
        </FooterExternalLink>
        {` | `}
        <FooterExternalLink href="https://commercetools.com/privacy">
          {'Imprint'}
        </FooterExternalLink>
      </div>
    </Spacings.Inline>
  </div>
);

export default LayoutFooter;
