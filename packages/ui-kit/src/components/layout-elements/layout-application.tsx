import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider as UiKitThemeProvider } from '@emotion/react';
import { dimensions, uikitTheme } from '../../design-system';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
type RootProps = { isGlobalNotificationVisible?: boolean };
const Root = styled.div<RootProps>`
  position: relative;
  width: 100vw;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* enables "momentum" style scrolling */

  scroll-padding-top: ${(props) =>
    props.isGlobalNotificationVisible
      ? `calc(${dimensions.heights.globalNotificationContent} + ${dimensions.spacings.s} * 3)`
      : dimensions.spacings.s};

  @media only screen and (${dimensions.viewports.tablet}) {
    height: 100vh;
  }
`;
const Container = styled.div<LayoutApplicationProps>`
  position: relative;
  height: 100%;
  display: grid;
  grid:
    [row1-start] 'main' 1fr [row1-end]
    / 1fr;

  @media screen and (${dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'sidebar main' 1fr [row1-end]
      / ${dimensions.widths.pageNavigationSmall} 1fr;
  }
  @media screen and (${dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'sidebar main' 1fr [row1-end]
      / ${dimensions.widths.pageNavigation} 1fr;
  }
`;
type LayoutApplicationProps = {
  websitePrimaryColor: string;
  globalNotification?: {
    notificationType: 'info' | 'warning';
    content: string;
  };
};
const LayoutApplication = (props: LayoutApplicationProps) => (
  <UiKitThemeProvider
    theme={{
      ...uikitTheme,
      websitePrimaryColor: props.websitePrimaryColor,
    }}
  >
    <Root
      role="application"
      id="application"
      isGlobalNotificationVisible={Boolean(props.globalNotification)}
    >
      <Container {...props} />
    </Root>
    <div id="modal-portal" />
  </UiKitThemeProvider>
);

export default LayoutApplication;
