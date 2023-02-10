import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  createStyledIcon,
  designSystem,
  Icons,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { CloseIcon } from '@commercetools-uikit/icons';
import { useInView } from 'react-intersection-observer';
import { Overlay, SearchInput } from '../../components';
import ReleaseNotesFilterDates from '../../components/release-notes-filter-dates';
import ReleaseNotesFilterTopics from '../../components/release-notes-filter-topics';

const StackedLinesIndentedIcon = createStyledIcon(
  Icons.StackedLinesIndentedIconSvgIcon
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
  width: ${designSystem.dimensions.widths.pageNavigation};
  background-color: ${designSystem.colors.light.surfacePrimary};
  animation: ${slideInAnimation} 0.15s ease-out alternate;
  padding: 0 ${designSystem.dimensions.spacings.m};
  height: 100%;
  overflow: auto;
`;
const GridContainer = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
    grid-area: page-navigation;
  }
`;

const stickyContainerCss = css({
  position: 'sticky',
  top: 0,
  marginTop: `-1px`,
  padding: `1px ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.m}`,
});
const stuckContainerCss = css(stickyContainerCss, {
  maxHeight: '100vh',
  overflow: 'auto',
});

const StickyContainer = (props) => {
  // this intersection observer only observes a one pixel high line outside the viewport.
  // the sticky element has a one pixel negative margin and hence the observer exactly detects when
  // the element is "stuck"
  const [ref, isStuck] = useInView({
    rootMargin: `1px 0px -100% 0px`,
    threshold: 0,
  });
  return (
    <div
      ref={ref}
      css={isStuck ? stuckContainerCss : stickyContainerCss}
      {...props}
    >
      {props.children}
    </div>
  );
};
StickyContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
  z-index: ${designSystem.dimensions.stacks.base};

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
  height: ${designSystem.dimensions.heights.pageSearchboxSpace};
`;

const LayoutPageReleaseNotesFilters = (props) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);

  const searchContainer = (
    <SearchBox
      key="search-container"
      excludeFromSearchIndex={props.excludeFromSearchIndex}
    >
      {props.isSearchBoxInView ? (
        <Blank />
      ) : (
        <SearchInputBox>
          <SearchInput
            id="search-input-release-notes"
            size="small"
            onFocus={props.openSearchDialog}
            isDisabled={props.excludeFromSearchIndex}
          />
        </SearchInputBox>
      )}
    </SearchBox>
  );

  const filtersContainer = (
    <SpacingsStack key="filters-container" scale="m">
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
            zIndex={designSystem.dimensions.stacks.aboveOverlay}
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
