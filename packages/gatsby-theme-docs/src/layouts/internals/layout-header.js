import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { designSystem, LogoButton } from '@commercetools-docs/ui-kit';
import { SearchDialog, SearchInput, Overlay } from '../../components';

const Container = styled.header`
  grid-area: header;
  border-bottom: 1px solid ${designSystem.colors.light.borderPrimary};
  z-index: 10;
  max-width: 100vw;
  display: block;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: grid;
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'header-content header-blank' ${designSystem.dimensions
        .heights.header} [row1-end]
      / ${designSystem.dimensions.widths.pageContentWithMargings}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const Content = styled.div`
  grid-area: header-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  height: 100%;
`;
const Blank = styled.div`
  grid-area: header-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;
const Inline = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const LogoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    display: none;
  }
`;
const DocumentationSwitcherContainer = styled.div`
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.body};
  padding: 0 0 0 1rem;
  margin: 0;
  height: calc(100% - ${designSystem.dimensions.spacings.m});
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SearchContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
  display: ${props => (props.excludeFromSearchIndex ? 'none' : 'block')};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    padding: 0;
  }

  @media only percy {
    display: block !important;
  }
`;

const LayoutHeader = props => {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const openSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(true);
  }, [setIsSearchDialogOpen]);
  const closeSearchDialog = () => {
    setIsSearchDialogOpen(false);
  };
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);
  return (
    <Container>
      <Content>
        <Inline alignItems="center">
          <LogoContainer>
            {/* Injected by React portal */}
            <div
              id="sidebar-menu-toggle"
              css={css`
                display: flex;
                @media screen and (${designSystem.dimensions.viewports
                    .laptop}) {
                  display: none;
                }
              `}
            />
            <LogoButton />
          </LogoContainer>
          <DocumentationSwitcherContainer>
            {props.siteTitle}
          </DocumentationSwitcherContainer>
        </Inline>
        <SearchContainer excludeFromSearchIndex={props.excludeFromSearchIndex}>
          {isSearchDialogOpen ? (
            modalPortalNode &&
            ReactDOM.createPortal(
              <Overlay onClick={closeSearchDialog}>
                <SearchDialog onClose={closeSearchDialog} />
              </Overlay>,
              modalPortalNode
            )
          ) : (
            <SearchInput
              id="search-input-placeholder"
              onFocus={openSearchDialog}
              size="small"
            />
          )}
        </SearchContainer>
      </Content>
      <Blank />
    </Container>
  );
};
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  constraintWidth: PropTypes.string,
};

export default LayoutHeader;
