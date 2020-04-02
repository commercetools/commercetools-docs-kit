import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import LayoutHeaderLogo from './layout-header-logo';

const Container = styled.nav`
  grid-area: sidebar;
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: ${designSystem.dimensions.widths.pageNavigationSmall};
  display: ${(props) => (props.isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  background-color: ${designSystem.colors.light.surfacePrimary};

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    display: flex;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;

const LayoutSidebarEmpty = () => (
  <Container>
    <LayoutHeaderLogo />
  </Container>
);

export default LayoutSidebarEmpty;
