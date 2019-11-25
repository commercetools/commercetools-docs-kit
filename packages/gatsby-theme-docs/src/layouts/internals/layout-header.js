import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography, tokens } from '../../design-system';
import LogoSvg from '../../icons/logo.svg';

const Container = styled.header`
  display: block;
  grid-row: 1;
  grid-column: 1/4;
  height: ${dimensions.heights.header};
  width: 100%;
  box-shadow: ${tokens.shadow1};
  z-index: 10;
  overflow: auto;
`;
const Constraint = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0;
  margin: 0 auto;
  height: 100%;

  > * + * {
    margin: 0 0 0 ${dimensions.spacings.m};
  }

  @media screen and (${dimensions.viewports.desktop}) {
    > * + * {
      margin: 0 0 0 ${dimensions.spacings.xl};
    }
  }
`;
const MenuLogoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (${dimensions.viewports.laptop}) {
    width: ${dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${dimensions.viewports.desktop}) {
    width: ${dimensions.widths.pageNavigation};
  }
`;
const LogoContainer = styled.div`
  padding: 0 ${dimensions.spacings.m};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
// This is a normal HTML link as we need to force a redirect to the root domain
const LogoLink = styled.a`
  color: ${colors.light.textPrimary};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  display: block;
`;
const LogoTitle = styled.div`
  display: none;
  font-size: ${typography.fontSizes.body};

  @media screen and (${dimensions.viewports.laptop}) {
    display: block;
  }
  @media screen and (${dimensions.viewports.desktop}) {
    font-size: ${typography.fontSizes.h4};
  }
`;
const DocumentationSwitcherContainer = styled.div`
  border-left: 1px solid ${colors.light.borderPrimary};
  color: ${colors.light.textSecondary};
  font-size: ${typography.fontSizes.body};
  padding: 0 0 0 1rem;
  margin: 0;
  height: calc(100% - ${dimensions.spacings.m});
  display: flex;
  align-items: center;
`;

const LayoutHeader = props => (
  <Container>
    <Constraint>
      <MenuLogoContainer>
        {/* Injected by React portal */}
        <div
          id="sidebar-menu-toggle"
          css={css`
            display: flex;
            @media screen and (${dimensions.viewports.laptop}) {
              display: none;
            }
          `}
        />
        <LogoLink href="/">
          <LogoContainer>
            <Spacings.Inline scale="m" alignItems="center">
              <LogoSvg height={32} />
              <LogoTitle>{'Documentation'}</LogoTitle>
            </Spacings.Inline>
          </LogoContainer>
        </LogoLink>
      </MenuLogoContainer>
      <DocumentationSwitcherContainer>
        {props.siteTitle}
      </DocumentationSwitcherContainer>
    </Constraint>
  </Container>
);
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default LayoutHeader;
