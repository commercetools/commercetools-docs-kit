import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';
import { SearchDialog, SearchInput, Overlay, TopMenu } from '../../components';

const Container = styled.header`
  grid-area: header;
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
  z-index: 10;
  max-width: 100vw;
  width: 100%;
  display: grid;
  grid:
    [row1-start] 'header-content' ${designSystem
      .dimensions.heights.header} [row1-end]
    / 1fr;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: grid;
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / ${designSystem.dimensions.widths.pageContentWithMargings}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const Content = styled.div`
  grid-area: header-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  height: 100%;
`;
const Blank = styled.div`
  grid-area: header-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;
const Inline = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const LogoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  border-right: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    display: none;
  }
`;
const DocumentationSwitcherContainer = styled.div`
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.body};
  padding: 0;
  margin: 0 0 0 ${designSystem.dimensions.spacings.m};
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: calc(100% - 2px);
  border-bottom: 2px solid
    ${props =>
      props.isActive
        ? designSystem.colors.light.linkNavigation
        : 'transparent'};

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    margin: 0 0 0 ${designSystem.dimensions.spacings.xl};
  }
`;
const SwitcherButton = styled.a`
  cursor: pointer;
  color: ${props =>
    props.isActive
      ? designSystem.colors.light.linkNavigation
      : designSystem.colors.light.textPrimary};
`;
const SearchContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  display: ${props => (props.excludeFromSearchIndex ? 'none' : 'block')};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    padding: 0;
  }

  @media only percy {
    display: block !important;
  }
`;

const LayoutHeader = props => (
  <Container>
    <Content>
      <Inline alignItems="center">
        <LogoContainer>
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
          <LogoButton />
        </LogoContainer>
        <DocumentationSwitcherContainer isActive={props.isTopMenuOpen}>
          <SwitcherButton
            role="button"
            aria-label={
              props.isTopMenuOpen ? 'Close top menu' : 'Open top menu'
            }
            isActive={props.isTopMenuOpen}
            onClick={props.toggleTopMenu}
          >
            <SpacingsInline alignItems="center">
              <span>{props.siteTitle}</span>
              {props.isTopMenuOpen ? (
                <AngleUpIcon size="medium" color="info" />
              ) : (
                <AngleDownIcon size="medium" />
              )}
            </SpacingsInline>
          </SwitcherButton>
          {props.isTopMenuOpen ? (
            <Overlay
              onClick={props.closeTopMenu}
              css={css`
                top: ${designSystem.dimensions.heights.header};
              `}
            >
              <TopMenu />
            </Overlay>
          ) : null}
        </DocumentationSwitcherContainer>
      </Inline>
      <SearchContainer excludeFromSearchIndex={props.excludeFromSearchIndex}>
        {props.isSearchDialogOpen ? (
          <Overlay
            onClick={props.closeSearchDialog}
            css={css`
              position: absolute;
            `}
          >
            <SearchDialog onClose={props.closeSearchDialog} />
          </Overlay>
        ) : (
          <SearchInput
            id="search-input-placeholder"
            onFocus={props.openSearchDialog}
            size="small"
          />
        )}
      </SearchContainer>
    </Content>
    <Blank />
  </Container>
);
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  constraintWidth: PropTypes.string,
  isSearchDialogOpen: PropTypes.bool.isRequired,
  openSearchDialog: PropTypes.func.isRequired,
  closeSearchDialog: PropTypes.func.isRequired,
  isTopMenuOpen: PropTypes.bool.isRequired,
  toggleTopMenu: PropTypes.func.isRequired,
  closeTopMenu: PropTypes.func.isRequired,
};

export default LayoutHeader;
