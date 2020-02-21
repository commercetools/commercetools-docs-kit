import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { BurgerIcon, Overlay } from '../../components';
import Sidebar from './sidebar';

const slideInAnimation = keyframes`
  from { margin-left: -100%; }
  to { margin-left: 0; }
`;
const Container = styled.nav`
  grid-area: sidebar;
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: ${designSystem.dimensions.widths.pageNavigationSmall};
  display: ${props => (props.isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  background-color: ${designSystem.colors.light.surfaceSecondary1};
  border-right: 1px solid ${designSystem.colors.light.borderPrimary};

  animation: ${slideInAnimation} 0.5s ease-out alternate;
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    animation: unset;
    display: flex;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
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

const LayoutSidebar = props => {
  const [menuButtonNode, setMenuButtonNode] = React.useState();
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setMenuButtonNode(document.getElementById('sidebar-menu-toggle'));
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);

  const menuButton = (
    <MenuButton
      aria-label="Open Main Navigation"
      onClick={props.toggleSidebarMenu}
    >
      <BurgerIcon isActive={props.isMenuOpen} />
    </MenuButton>
  );

  if (props.isMenuOpen) {
    return (
      <>
        {menuButtonNode && ReactDOM.createPortal(menuButton, menuButtonNode)}
        {modalPortalNode &&
          ReactDOM.createPortal(
            <Overlay onClick={props.closeSidebarMenu}>
              <Container
                aria-label="Main Navigation"
                isMenuOpen={true}
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Sidebar
                  onLinkClick={props.closeSidebarMenu}
                  siteTitle={props.siteTitle}
                  isGlobalBeta={props.isGlobalBeta}
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
      <Container role="nav" aria-label="Main Navigation" isMenuOpen={false}>
        <Sidebar
          siteTitle={props.siteTitle}
          isGlobalBeta={props.isGlobalBeta}
        />
        {props.isSearchDialogOpen && (
          <Overlay
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
  isMenuOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired,
  siteTitle: PropTypes.string.isRequired,
  isGlobalBeta: PropTypes.bool.isRequired,
  isSearchDialogOpen: PropTypes.bool.isRequired,
  closeSearchDialog: PropTypes.func.isRequired,
};

export default LayoutSidebar;
