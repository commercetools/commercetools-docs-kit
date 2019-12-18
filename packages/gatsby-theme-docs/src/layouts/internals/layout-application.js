import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider as UiKitThemeProvider } from 'emotion-theming';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] 'header' ${designSystem.dimensions.heights.header} [row1-end]
    [row2-start] 'main' 1fr [row2-end]
    / 1fr;

  @media only percy {
    /* Unset the 100vh to make view scrollable in order to take full page snapshots */
    height: auto;
  }
`;

const LayoutApplication = props => (
  <UiKitThemeProvider theme={designSystem.uikitTheme}>
    <Container {...props} />
    <div id="modal-portal" />
  </UiKitThemeProvider>
);

// eslint-disable-next-line react/display-name
export default LayoutApplication;
