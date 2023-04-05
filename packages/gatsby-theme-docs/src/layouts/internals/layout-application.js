import React from 'react';
import { SWRConfig } from 'swr';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import useIsClientSide from '../../hooks/use-is-client-side';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Root = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* enables "momentum" style scrolling */

  scroll-padding-top: ${(props) =>
    props.isGlobalNotificationVisible
      ? `calc(${designSystem.dimensions.heights.globalNotificationContent} + ${designSystem.dimensions.spacings.s} * 3)`
      : designSystem.dimensions.spacings.s};

  @media only screen and (${designSystem.dimensions.viewports.tablet}) {
    height: 100vh;
  }
`;
const Container = styled.div`
  position: relative;
  height: 100%;
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

const localStorageProvider = () => {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  const handleBeforUnload = (event) => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  };

  const handleBeforeAuth0LoginRedirect = (event) => {
    // I'm about to redirect to auth0, I want to disable the set cache logic
    window.removeEventListener(handleBeforUnload);
    // and ensure the cache is clean
    localStorage.removeItem('app-cache');
  };

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', handleBeforUnload);

  window.addEventListener(
    'beforeAuth0LoginRedirect',
    handleBeforeAuth0LoginRedirect
  );

  // We still use the map for write & read for performance.
  return map;
};

const LayoutApplication = (props) => {
  const { isClientSide } = useIsClientSide();
  return (
    <>
      <Root
        role="application"
        id="application"
        isGlobalNotificationVisible={Boolean(props.globalNotification)}
      >
        {isClientSide ? (
          <SWRConfig value={{ provider: localStorageProvider }}>
            <Container {...props} />
          </SWRConfig>
        ) : (
          <Container {...props} />
        )}
      </Root>
      <div id="modal-portal" />
    </>
  );
};
LayoutApplication.propTypes = {
  globalNotification: PropTypes.shape({
    notificationType: PropTypes.oneOf(['info', 'warning']).isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default LayoutApplication;
