import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import { ExternalSiteLink } from '../../components';
import LogoSvg from '../../icons/logo.svg';

const Container = styled.div`
  background-color: ${designSystem.colors.light.surfaceSecondary2};
  padding: ${designSystem.dimensions.spacings.m};

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    padding: ${designSystem.dimensions.spacings.xl};
  }
`;

const FooterExternalLink = styled(ExternalSiteLink)`
  font-size: ${designSystem.typography.fontSizes.small};
  color: ${designSystem.colors.light.textPrimary} !important;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const LayoutFooter = () => (
  <Container>
    <SpacingsInline alignItems="center" justifyContent="space-between">
      <SpacingsInline scale="m" alignItems="center">
        <LogoSvg height={32} />
        <div
          css={css`
            font-size: ${designSystem.typography.fontSizes.small};
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
  </Container>
);

export default LayoutFooter;
