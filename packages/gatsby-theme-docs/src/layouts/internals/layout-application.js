import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider as UiKitThemeProvider } from 'emotion-theming';
import { dimensions, uikitTheme } from '../../design-system';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] 'header' ${dimensions.heights.header} [row1-end]
    [row2-start] 'main' 1fr [row2-end]
    / 1fr;

  @media only percy {
    /* Unset the 100vh to make view scrollable in order to take full page snapshots */
    height: auto;
  }
`;

const LayoutApplication = props => (
  <UiKitThemeProvider theme={uikitTheme}>
    <Container {...props} />
  </UiKitThemeProvider>
);

// eslint-disable-next-line react/display-name
export default LayoutApplication;
