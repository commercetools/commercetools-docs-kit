import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  designSystem,
  createStyledIcon,
  LogoButton,
  MediaQuery,
} from '@commercetools-docs/ui-kit';
import { SearchDialog, SearchInput, Overlay, TopMenu } from '../../components';
import UnstyledSearchIcon from '../../icons/search.svg';

const SearchIcon = createStyledIcon(UnstyledSearchIcon);

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
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / ${designSystem.dimensions.widths.pageContentWithMargins}
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
    ${(props) =>
      props.isActive || props.mouseIsOverTopMenuButton
        ? designSystem.colors.light.linkNavigation
        : 'transparent'};

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    margin: 0 0 0 ${designSystem.dimensions.spacings.xl};
  }
`;
const SwitcherButton = styled.a`
  cursor: pointer;
  color: ${(props) =>
    props.isActive
      ? designSystem.colors.light.linkNavigation
      : designSystem.colors.light.textPrimary};
  :hover {
    color: ${designSystem.colors.light.linkNavigation};
  }
`;
const SearchContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  display: ${(props) => (props.excludeFromSearchIndex ? 'none' : 'block')};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    padding: 0;
  }

  @media only percy {
    display: block !important;
  }
`;

const LayoutHeader = (props) => {
  const [
    mouseIsOverTopMenuButton,
    setMouseIsOverTopMenuButton,
  ] = React.useState(false);

  return (
    <Container>
      <Content>
        <Inline alignItems="center">
          <LogoContainer>
            {/* Injected by React portal */}
            <div
              id="sidebar-menu-toggle"
              css={css`
                display: flex;
                @media screen and (${designSystem.dimensions.viewports
                    .laptop}) {
                  display: none;
                }
              `}
            />
            <LogoButton />
          </LogoContainer>
          <DocumentationSwitcherContainer
            isActive={props.isTopMenuOpen}
            mouseIsOverTopMenuButton={mouseIsOverTopMenuButton}
          >
            <SwitcherButton
              role="button"
              aria-label={
                props.isTopMenuOpen ? 'Close Top Menu' : 'Open Top Menu'
              }
              isActive={props.isTopMenuOpen}
              onClick={props.toggleTopMenu}
              onMouseOver={handleOnMouseOverTopMenu}
              onMouseLeave={handleOnMouseLeaveTopMenu}
            >
              <SpacingsInline alignItems="center">
                <span>{props.siteTitle}</span>
                {!mouseIsOverTopMenuButton && !props.isTopMenuOpen && (
                  <AngleDownIcon size="medium" />
                )}
                {mouseIsOverTopMenuButton && !props.isTopMenuOpen && (
                  <AngleDownIcon size="medium" color="info" />
                )}
                {props.isTopMenuOpen && (
                  <AngleUpIcon size="medium" color="info" />
                )}
              </SpacingsInline>
            </SwitcherButton>
            {props.isTopMenuOpen ? (
              <Overlay
                top={designSystem.dimensions.heights.header}
                onClick={props.closeTopMenu}
              >
                <TopMenu centered={props.centeredTopMenu} />
              </Overlay>
            ) : null}
          </DocumentationSwitcherContainer>
        </Inline>
        <SearchContainer excludeFromSearchIndex={props.excludeFromSearchIndex}>
          {props.isSearchDialogOpen ? (
            <Overlay position="absolute" onClick={props.closeSearchDialog}>
              <SearchDialog
                centered={props.centeredSearchDialog}
                onClose={props.closeSearchDialog}
              />
            </Overlay>
          ) : (
            <>
              <MediaQuery forViewport="mobile">
                <IconButton
                  icon={<SearchIcon />}
                  size="big"
                  label="Open search dialog"
                  onClick={props.openSearchDialog}
                  isDisabled={props.excludeFromSearchIndex}
                />
              </MediaQuery>
              <MediaQuery forViewport="tablet">
                <SearchInput
                  id="search-input-placeholder"
                  size="small"
                  onFocus={props.openSearchDialog}
                  isDisabled={props.excludeFromSearchIndex}
                />
              </MediaQuery>
            </>
          )}
        </SearchContainer>
      </Content>
      <Blank />
    </Container>
  );

  function handleOnMouseOverTopMenu() {
    setMouseIsOverTopMenuButton(true);
  }

  function handleOnMouseLeaveTopMenu() {
    setMouseIsOverTopMenuButton(false);
  }
};
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
  centeredTopMenu: PropTypes.bool,
  centeredSearchDialog: PropTypes.bool,
};

export default LayoutHeader;
