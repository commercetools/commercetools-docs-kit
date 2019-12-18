import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem } from '@commercetools-docs/ui-kit';
import { SearchBar } from '../../components';
import LogoSvg from '../../icons/logo.svg';

const Container = styled.header`
  display: block;
  grid-area: header;
  height: ${designSystem.dimensions.heights.header};
  width: 100%;
  box-shadow: ${designSystem.tokens.shadow1};
  z-index: 10;
`;
const Constraint = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${props =>
      props.constraintWidth ||
      `calc(
        ${designSystem.dimensions.widths.pageContentWithMargings} +
        ${designSystem.dimensions.widths.pageNavigation} * 2 )
      `};
  }
`;
const Inline = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const MenuLogoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const LogoContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
// This is a normal HTML link as we need to force a redirect to the root domain
const LogoLink = styled.a`
  color: ${designSystem.colors.light.textPrimary};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  display: block;
  width: 100%;
`;
const LogoTitle = styled.div`
  display: none;
  font-size: ${designSystem.typography.fontSizes.body};

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    display: block;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    font-size: ${designSystem.typography.fontSizes.h4};
  }
`;
const DocumentationSwitcherContainer = styled.div`
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.body};
  padding: 0 0 0 1rem;
  margin: 0;
  height: calc(100% - ${designSystem.dimensions.spacings.m});
  display: flex;
  align-items: center;
`;
const SearchContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  display: ${props => (props.excludeFromSearchIndex ? 'none' : 'block')};

  @media only percy {
    display: block !important;
  }
`;

const LayoutHeader = props => (
  <Container>
    <Constraint constraintWidth={props.constraintWidth}>
      <Inline alignItems="center">
        <MenuLogoContainer>
          {/* Injected by React portal */}
          <div
            id="sidebar-menu-toggle"
            css={css`
              display: flex;
              @media screen and (${designSystem.dimensions.viewports.laptop}) {
                display: none;
              }
            `}
          />
          <LogoLink href="/">
            <LogoContainer>
              <SpacingsInline scale="m" alignItems="center">
                <LogoSvg height={32} />
                <LogoTitle>{'Documentation'}</LogoTitle>
              </SpacingsInline>
            </LogoContainer>
          </LogoLink>
        </MenuLogoContainer>
        <DocumentationSwitcherContainer>
          {props.siteTitle}
        </DocumentationSwitcherContainer>
      </Inline>
      <SearchContainer excludeFromSearchIndex={props.excludeFromSearchIndex}>
        <SearchBar />
      </SearchContainer>
    </Constraint>
  </Container>
);
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  constraintWidth: PropTypes.string,
};

export default LayoutHeader;
