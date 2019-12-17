import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider as UiKitThemeProvider } from 'emotion-theming';
import { designSystem } from '@commercetools-docs/ui-kit';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Container = styled.div`
  position: relative;
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'center' auto [row1-end]
      / 100%;
    width: auto;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'left center right' auto [row1-end]
      / minmax(0, 100%) 1fr minmax(0, 100%);
    width: auto;
  }
  @media only percy {
    /* Unset the 100vh to make view scrollable in order to take full page snapshots */
    height: auto;
  }
`;
const EmptyLeft = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-area: left;
    display: block;
  }
`;
const EmptyRight = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-area: right;
    display: block;
  }
`;
const Center = styled.div`
  grid-area: center;
  display: grid;
  grid:
    [row1-start] 'page' 1fr [row1-end]
    / 1fr;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'sidebar page' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigationSmall} 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'sidebar page' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation} 1fr;
    width: calc(
      ${designSystem.dimensions.widths.pageContentWithMargings} +
        ${designSystem.dimensions.widths.pageNavigation} * 2
    );
  }
`;

const LayoutApplication = props => (
  <Container role="application">
    <EmptyLeft />
    <EmptyRight />
    <UiKitThemeProvider theme={designSystem.uikitTheme}>
      <Center {...props} />
    </UiKitThemeProvider>
    <div id="modal-portal" />
  </Container>
);

export default LayoutApplication;
