import React from 'react';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { dimensions, colors, typography } from '../design-system';
import { LogoSvgIcon } from '../icons';

const LinkContainer = styled.span`
  padding: 0 ${dimensions.spacings.m};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
// This is a normal HTML link as we need to force a redirect to the root domain
const Link = styled.a`
  color: ${colors.light.brandLogoColor};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  display: block;
  width: 100%;
`;
const Title = styled.span`
  display: none;
  font-size: ${typography.fontSizes.body};

  @media screen and (${dimensions.viewports.laptop}) {
    display: block;
  }

  @media screen and (${dimensions.viewports.desktop}) {
    font-size: ${typography.fontSizes.h4};
  }
`;

const LogoButton = () => (
  <Link href="/">
    <LinkContainer>
      <SpacingsInline scale="m" alignItems="center">
        <LogoSvgIcon height={36} />
        <Title>{'Documentation'}</Title>
      </SpacingsInline>
    </LinkContainer>
  </Link>
);
LogoButton.displayName = 'LogoButton';

export default LogoButton;
