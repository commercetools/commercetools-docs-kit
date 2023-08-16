import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { designSystem, MediaQuery } from '@commercetools-docs/ui-kit';
import { BurgerIcon, Overlay, TopMenu } from '../../components';
import SelfLearningSidebar from './self-learning/sidebar';
import Sidebar from './sidebar';
import { useSiteData } from '../../hooks/use-site-data';

const slideInAnimation = keyframes`
  from { margin-left: -100%; }
  to { margin-left: 0; }
`;
const Container = styled.nav`
  grid-area: sidebar;
  position: fixed;
  z-index: ${designSystem.dimensions.stacks.sidebar};
  height: 100vh;
  width: ${designSystem.dimensions.widths.pageNavigationSmall};
  display: ${(props) => (props.isSidebarMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  background-color: ${designSystem.colors.light.surfaceSecondary1};
  border-right: 1px solid ${designSystem.colors.light.borderPrimary};

  animation: ${slideInAnimation} 0.15s ease-out alternate;
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    animation: unset;
    display: flex;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }

  @media only percy {
    animation: unset;
  }
`;
const MenuButton = styled.button`
  appearance: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  padding: ${designSystem.dimensions.spacings.s}
    ${designSystem.dimensions.spacings.m};
  background-color: ${designSystem.colors.light.surfaceSecondary1};
  transition: background-color 0.5s;

  > svg {
    stroke: ${designSystem.colors.light.surfaceSecondary3};
    transition: stroke 0.5s;
  }

  :focus {
    outline: 1px solid ${designSystem.colors.light.surfaceSecondary3};
  }
  :hover {
    background-color: ${designSystem.colors.light.surfaceSecondary3};
    > svg {
      stroke: ${designSystem.colors.light.surfaceSecondary1};
    }
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    display: none;
  }
`;

const LayoutSidebar = (props) => {
  const [menuButtonNode, setMenuButtonNode] = React.useState();
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setMenuButtonNode(document.getElementById('sidebar-menu-toggle'));
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);
  const siteData = useSiteData();
  const SidebarComponent = siteData.siteMetadata.isSelfLearning
    ? SelfLearningSidebar
    : Sidebar;

  const menuButton = (
    <MenuButton
      aria-label="Open Main Navigation"
      onClick={props.toggleSidebarMenu}
    >
      <BurgerIcon isActive={props.isSidebarMenuOpen} />
    </MenuButton>
  );

  if (props.isSidebarMenuOpen) {
    return (
      <>
        {menuButtonNode && ReactDOM.createPortal(menuButton, menuButtonNode)}
        {modalPortalNode &&
          ReactDOM.createPortal(
            <Overlay zIndex="22" onClick={props.closeSidebarMenu}>
              <Container
                aria-label="Main Navigation"
                isSidebarMenuOpen={true}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <SidebarComponent
                  onLinkClick={props.closeSidebarMenu}
                  siteTitle={props.siteTitle}
                  isGlobalBeta={props.isGlobalBeta}
                  hasReleaseNotes={props.hasReleaseNotes}
                />
              </Container>
            </Overlay>,
            modalPortalNode
          )}
      </>
    );
  }

  return (
    <>
      {menuButtonNode && ReactDOM.createPortal(menuButton, menuButtonNode)}
      <Container
        role="nav"
        aria-label="Main Navigation"
        isSidebarMenuOpen={false}
      >
        <SidebarComponent
          siteTitle={props.siteTitle}
          isGlobalBeta={props.isGlobalBeta}
          hasReleaseNotes={props.hasReleaseNotes}
        />
        {props.isTopMenuOpen ? (
          // GIVEN that the viewport is equal or larger than laptop (sidebar visible)
          // AND the top menu has been opened
          // THEN render the top menu overlay in this position.
          // This is to ensure that the `z-index` values of the sidebar + main containers
          // are correctly applied in relation to the top bar (logo + header) and therefore
          // the top menu "slide down" animation does not transition over the top bar
          // but instead underneath.
          // See `./layout-main.js` for rendering the top menu for smaller viewports.
          <MediaQuery forViewport="laptop">
            <Overlay
              top={designSystem.dimensions.heights.header}
              onClick={props.closeTopMenu}
            >
              <TopMenu />
            </Overlay>
          </MediaQuery>
        ) : null}
        {props.isSearchDialogOpen && (
          <Overlay
            zIndex={designSystem.dimensions.stacks.aboveOverlay}
            position="absolute"
            display="none"
            css={css`
              @media screen and (${designSystem.dimensions.viewports
                  .largeTablet}) {
                display: block !important;
              }
            `}
          />
        )}
      </Container>
    </>
  );
};
LayoutSidebar.displayName = 'LayoutSidebar';
LayoutSidebar.propTypes = {
  isSidebarMenuOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired,
  isTopMenuOpen: PropTypes.bool.isRequired,
  closeTopMenu: PropTypes.func.isRequired,
  siteTitle: PropTypes.string.isRequired,
  isGlobalBeta: PropTypes.bool.isRequired,
  hasReleaseNotes: PropTypes.bool.isRequired,
  isSearchDialogOpen: PropTypes.bool.isRequired,
};

export default LayoutSidebar;
