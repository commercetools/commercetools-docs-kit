import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { createStyledIcon, designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { CloseIcon } from '@commercetools-uikit/icons';
import { StackedLinesIndentedIconSvgIcon } from '../../icons';
import { Overlay, SearchInput } from '../../components';
import ReleaseNotesFilterDates from '../../components/release-notes-filter-dates';
import ReleaseNotesFilterTopics from '../../components/release-notes-filter-topics';

const StackedLinesIndentedIcon = createStyledIcon(
  StackedLinesIndentedIconSvgIcon
);

const slideInAnimation = keyframes`
  from { margin-right: -100%; }
  to { margin-right: 0; }
`;
const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SlidingContainer = styled.div`
  background-color: ${designSystem.colors.light.surfacePrimary};
  animation: ${slideInAnimation} 0.5s ease-out alternate;
  width: calc(${designSystem.dimensions.widths.pageNavigation});
  padding: ${designSystem.dimensions.spacings.m};
  height: 100%;
  overflow: auto;
`;
const GridContainer = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
    grid-area: page-navigation;
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const StickyContainer = styled.div`
  position: sticky;
  top: ${designSystem.dimensions.spacings.xxl};
  margin: 0 0 ${designSystem.dimensions.spacings.s};
  padding: 0 ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m};
`;
const ReleasesTitleLink = styled.a`
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  text-decoration: none;
  :hover {
    color: ${designSystem.colors.light.linkNavigation};
    svg {
      * {
        fill: ${designSystem.colors.light.linkNavigation};
      }
    }
  }
  :hover,
  :active {
    outline-width: 0;
  }
`;
const ToggleMenuButton = styled.div`
  position: fixed;
  top: calc(
    ${designSystem.dimensions.heights.header} +
      ${designSystem.dimensions.spacings.m}
  );
  right: ${designSystem.dimensions.spacings.m};
  cursor: pointer;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: none;
  }
`;

const SearchBox = styled.div`
  display: ${(props) => (props.excludeFromSearchIndex ? 'none' : 'block')};

  @media only percy {
    display: block !important;
  }
`;

const SearchInputBox = styled.div`
  padding: ${designSystem.dimensions.spacings.m} 0;
  animation: ${fadeInAnimation} 0.4s ease-in;
  max-width: calc(
    ${designSystem.dimensions.widths.pageNavigationSmall} -
      ${designSystem.dimensions.spacings.m} * 2
  );
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    max-width: calc(
      ${designSystem.dimensions.widths.pageNavigation} -
        ${designSystem.dimensions.spacings.m} * 2
    );
  }
`;

const Blank = styled.div`
  height: 60px;
`;

const LayoutPageReleaseNotesFilters = (props) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);

  const searchContainer = (
    <SearchBox excludeFromSearchIndex={props.excludeFromSearchIndex}>
      {props.isSearchBoxInView ? (
        <Blank />
      ) : (
        <SearchInputBox>
          <SearchInput
            id="search-input-placeholder"
            size="small"
            onFocus={props.openSearchDialog}
            isDisabled={props.excludeFromSearchIndex}
          />
        </SearchInputBox>
      )}
    </SearchBox>
  );

  const filtersContainer = (
    <SpacingsStack scale="m">
      <SpacingsInline
        scale="s"
        justifyContent="space-between"
        alignItems="center"
      >
        <ReleasesTitleLink href="#top">
          <SpacingsInline scale="s" alignItems="center">
            <div>Releases</div>
            <div>
              <StackedLinesIndentedIcon color="textSecondary" />
            </div>
          </SpacingsInline>
        </ReleasesTitleLink>
        {isMenuOpen && (
          <SecondaryIconButton
            icon={<CloseIcon size="medium" />}
            label="Close release notes filters"
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        )}
      </SpacingsInline>
      <ReleaseNotesFilterDates />
      <ReleaseNotesFilterTopics />
    </SpacingsStack>
  );

  if (isMenuOpen) {
    return modalPortalNode
      ? ReactDOM.createPortal(
          <Overlay
            justifyContent="flex-end"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <SlidingContainer
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {filtersContainer}
            </SlidingContainer>
          </Overlay>,
          modalPortalNode
        )
      : null;
  }

  return (
    <>
      <ToggleMenuButton>
        <IconButton
          icon={<StackedLinesIndentedIcon theme="textSecondary" />}
          label="Open release notes filters"
          onClick={() => {
            setMenuOpen(true);
          }}
        />
      </ToggleMenuButton>
      <GridContainer>
        <StickyContainer>{[searchContainer, filtersContainer]}</StickyContainer>
      </GridContainer>
    </>
  );
};
LayoutPageReleaseNotesFilters.displayName = 'LayoutPageReleaseNotesFilters';
LayoutPageReleaseNotesFilters.propTypes = {
  isSearchBoxInView: PropTypes.bool.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  openSearchDialog: PropTypes.func.isRequired,
};

export default LayoutPageReleaseNotesFilters;
