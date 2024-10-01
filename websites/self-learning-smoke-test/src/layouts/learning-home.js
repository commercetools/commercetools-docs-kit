import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  LayoutHeader,
  Footer,
  Overlay,
  TopMenu,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs/';

import UserProfileInit from '@commercetools-docs/gatsby-theme-docs/src/modules/self-learning/components/user-profile-init';
import {
  GRID_ID_HEADER_TOP_MENU,
  GRID_ID_HEADER_SEARCHBOX,
} from '@commercetools-docs/gatsby-theme-docs/src/layouts/internals/layout-design-config';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';
import useAiAssistant from '@commercetools-docs/gatsby-theme-docs/src/modules/ai-assistant/hooks/use-ai-assistant';
import ChatModal from '@commercetools-docs/gatsby-theme-docs/src/modules/ai-assistant/components/chat-modal';
import ChatFeedbackModal from '@commercetools-docs/gatsby-theme-docs/src/modules/ai-assistant/components/chat-feedback-modal';
import ProfileModal from '@commercetools-docs/gatsby-theme-docs/src/modules/self-learning/components/profile-modal';

export const maxPageWidth = '1100px';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${(props) =>
    // Prevents scroll when top menu is open
    props.preventScroll &&
    css`
      height: 100vh;
      overflow-y: hidden;
    `}
`;
const HeaderContainer = styled.div`
  background-color: ${designSystem.colors.light.surfacePrimary};
  width: 100%;
  max-width: ${maxPageWidth};
  margin: 0 auto;
  display: grid;
  z-index: ${designSystem.dimensions.stacks.aboveOverlay};
  grid:
    [row1-start] 'header-logo header' ${designSystem
      .dimensions.heights.header} [row1-end]
    / auto 1fr;
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'header-logo header' ${designSystem.dimensions.heights
        .header} [row1-end]
      / ${designSystem.dimensions.widths.pageNavigationSmall} 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'header-logo header' ${designSystem.dimensions.heights
        .header} [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation} 1fr;
  }

  /* Override some styles of the original <LayoutHeader> */
  header {
    grid:
      [row1-start] '${GRID_ID_HEADER_TOP_MENU} ${GRID_ID_HEADER_SEARCHBOX}' ${designSystem
        .dimensions.heights.header} [row1-end]
      / 1fr;
  }
`;
const LogoContainer = styled.div`
  grid-area: header-logo;
  display: none;
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    height: calc(${designSystem.dimensions.heights.header} - 1px);
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
    background-color: ${designSystem.colors.light.surfacePrimary};
    border-right: 1px solid ${designSystem.colors.light.borderPrimary};
    border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
    display: flex;
    justify-content: flex-end;
    z-index: ${designSystem.dimensions.stacks.aboveOverlay};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: ${designSystem.tokens.shadowForPageContent};
  z-index: 1;
`;
const LayoutFooter = styled.div`
  grid-area: footer;
  width: 100%;
  background-color: ${designSystem.colors.light.surfaceSecondary2};
`;
const FooterConstraint = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
  margin: 0 auto;
`;

const LayoutLearningHome = (props) => {
  // State for the top menu
  const [isTopMenuOpen, setIsTopMenuOpen] = React.useState(false);
  const toggleTopMenu = React.useCallback(() => {
    setIsTopMenuOpen((prev) => !prev);
  }, [setIsTopMenuOpen]);
  const closeTopMenu = React.useCallback(() => {
    setIsTopMenuOpen(false);
  }, [setIsTopMenuOpen]);

  // State for the search dialog
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const openSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(true);
    // Additionally make sure to close the top menu
    closeTopMenu();
  }, [setIsSearchDialogOpen, closeTopMenu]);
  const closeSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(false);
  }, [setIsSearchDialogOpen]);

  const siteData = useSiteData();
  useAiAssistant();
  return (
    <Container preventScroll={isTopMenuOpen}>
      <HeaderContainer>
        <LogoContainer>
          <LogoButton />
        </LogoContainer>
        <LayoutHeader
          siteTitle={siteData.siteMetadata.title}
          excludeFromSearchIndex={false}
          isSearchDialogOpen={isSearchDialogOpen}
          openSearchDialog={openSearchDialog}
          closeSearchDialog={closeSearchDialog}
          isTopMenuOpen={isTopMenuOpen}
          toggleTopMenu={toggleTopMenu}
          closeTopMenu={closeTopMenu}
          centeredSearchDialog
        />
        {isTopMenuOpen ? (
          <Overlay
            top={designSystem.dimensions.heights.header}
            onClick={closeTopMenu}
          >
            <TopMenu centered />
          </Overlay>
        ) : null}
      </HeaderContainer>
      <Main>{props.children}</Main>
      <LayoutFooter>
        <FooterConstraint>
          <Footer />
        </FooterConstraint>
      </LayoutFooter>
      <UserProfileInit />
      <ProfileModal />
      <ChatModal />
      <ChatFeedbackModal />
      <div id="modal-portal" />
    </Container>
  );
};
LayoutLearningHome.displayName = 'LayoutLearningHome';
LayoutLearningHome.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutLearningHome;
