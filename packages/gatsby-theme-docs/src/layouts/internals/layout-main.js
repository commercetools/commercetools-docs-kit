import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem, MediaQuery } from '@commercetools-docs/ui-kit';
import { Overlay, TopMenu } from '../../components';

const Container = styled.main`
  grid-area: main;
  min-width: 0;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'header' ${designSystem.dimensions.heights.header} [row1-end]
    [row2-start] 'page' 1fr [row2-end]
    [row3-start] 'footer' auto [row3-end]
    / 1fr;

  ${(props) =>
    // Prevents scroll when top menu is open
    props.preventScroll &&
    css`
      height: 100vh;
      overflow-y: hidden;
    `}
`;

const LayoutMain = (props) => (
  <Container
    preventScroll={props.preventScroll}
    // This is important to make the main container the active element when the page loads.
    // The user can then use the keyboard navigation for example to scroll up/down.
    autoFocus
    tabIndex={0}
  >
    {props.isTopMenuOpen ? (
      // GIVEN that the viewport is equal or less than laptop (sidebar not visible)
      // AND the top menu has been opened
      // THEN render the top menu overlay in this position.
      // This is to ensure that the `z-index` values of the main container is
      // correctly applied in relation to the top bar (header) and therefore
      // the top menu "slide down" animation does not transition over the top bar
      // but instead underneath.
      // See `./layout-sidebar.js` for rendering the top menu for bigger viewports.
      <MediaQuery forViewport="laptop" hideIfMatch={true}>
        <Overlay
          top={designSystem.dimensions.heights.header}
          onClick={props.closeTopMenu}
        >
          <TopMenu closeTopMenu={props.closeTopMenu} />
        </Overlay>
      </MediaQuery>
    ) : null}
    {props.children}
  </Container>
);
LayoutMain.displayName = 'LayoutMain';
LayoutMain.propTypes = {
  preventScroll: PropTypes.bool.isRequired,
  isTopMenuOpen: PropTypes.bool.isRequired,
  closeTopMenu: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutMain;
