import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { UserProfileInit } from '../../self-learning';
import ProfileModal from '../../self-learning/components/profile-modal';

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

const LayoutApplication = (props) => (
  <>
    <Root
      role="application"
      id="application"
      isGlobalNotificationVisible={Boolean(props.globalNotification)}
    >
      <Container {...props} />
    </Root>
    <UserProfileInit />
    <ProfileModal />
    <div id="modal-portal" />
  </>
);
LayoutApplication.propTypes = {
  globalNotification: PropTypes.shape({
    notificationType: PropTypes.oneOf(['info', 'warning']).isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default LayoutApplication;
