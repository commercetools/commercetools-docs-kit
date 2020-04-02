import React from 'react';
import styled from '@emotion/styled';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  display: none;
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    height: calc(
      ${designSystem.dimensions.heights.header} - 1px
    ); /* TODO: investigate why we need 1px less here */
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
    background-color: ${designSystem.colors.light.surfacePrimary};
    border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;

const LayoutHeaderLogo = () => (
  <Container>
    <LogoButton />
  </Container>
);

export default LayoutHeaderLogo;
