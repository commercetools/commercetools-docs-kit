import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider as UiKitThemeProvider } from 'emotion-theming';
import { designSystem } from '@commercetools-docs/ui-kit';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Root = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* enables "momentum" style scrolling */
`;
const Container = styled.div`
  position: relative;
  display: grid;
  grid:
    [row1-start] 'main' 1fr [row1-end]
    / 1fr;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'sidebar main' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigationSmall} 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'sidebar main' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation} 1fr;
  }
`;

const LayoutApplication = props => (
  <UiKitThemeProvider theme={designSystem.uikitTheme}>
    <Root role="application">
      <Container {...props} />
    </Root>
    <div id="modal-portal" />
  </UiKitThemeProvider>
);

export default LayoutApplication;
