import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import IconButton from '@commercetools-uikit/icon-button';
import { ArrowUpIcon } from '@commercetools-uikit/icons';
import { createStyledIcon, designSystem } from '@commercetools-docs/ui-kit';
import { useInView } from 'react-intersection-observer';
import { StackedLinesIndentedIconSvgIcon } from '../../icons';
import PlaceholderPageHeaderSide from '../../overrides/page-header-side';
import PlaceholderPageHeaderSideBannerArea from '../../overrides/page-header-banner-area';
import { Overlay, BetaFlag, SearchInput } from '../../components';
import PageNavigation from './page-navigation';

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
  width: ${designSystem.dimensions.widths.pageNavigation};
  background-color: ${designSystem.colors.light.surfacePrimary};
  animation: ${slideInAnimation} 0.15s ease-out alternate;
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
const BetaWrapper = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
`;

const stickyContainerCss = css({
  position: 'sticky',
  top: 0,
  marginTop: `-1px`,
  paddingTop: '1px',
});
const stuckContainerCss = css(stickyContainerCss, {
  maxHeight: '100vh',
  overflow: 'auto',
  scrollbarWidth: 'thin',
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

const PageTitleLink = styled.a`
  color: ${designSystem.colors.light.textSecondary};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  padding: 0 ${designSystem.dimensions.spacings.m};
  border-left: 1px solid transparent;
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
  padding: ${designSystem.dimensions.spacings.m};
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

const LayoutPageNavigation = (props) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);

  if (!props.tableOfContents) return null;
  if (
    !props.tableOfContents.items ||
    (props.tableOfContents.items && props.tableOfContents.items.length === 0)
  )
    return null;

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
            id="search-input-page-navigation"
            size="small"
            onFocus={props.openSearchDialog}
            isDisabled={props.excludeFromSearchIndex}
          />
        </SearchInputBox>
      )}
    </SearchBox>
  );

  const navigationContainer = (
    <nav
      key="navigation-container"
      aria-label="Page Table of Contents Navigation"
      css={{
        marginBottom: designSystem.dimensions.spacings.l,
      }}
    >
      <SpacingsStack scale="m">
        <PageTitleLink href="#top">
          <SpacingsInline scale="s">
            <div>
              <ArrowUpIcon size="medium" color="neutral60" />
            </div>
            <SpacingsStack scale="xs">
              {/* The padding is required to align the page title with the icon */}
              <div
                css={css`
                  padding-top: 1px;
                `}
              >
                {props.pageTitle}
              </div>
              {props.beta && (
                <BetaWrapper>
                  <BetaFlag />
                </BetaWrapper>
              )}
            </SpacingsStack>
          </SpacingsInline>
        </PageTitleLink>
        <PageNavigation
          tableOfContents={props.tableOfContents}
          navLevels={props.navLevels}
        />
      </SpacingsStack>
    </nav>
  );

  if (isMenuOpen) {
    return modalPortalNode
      ? ReactDOM.createPortal(
          <Overlay
            zIndex="22"
            justifyContent="flex-end"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <SlidingContainer>
              <div
                css={css`
                  padding-left: ${designSystem.dimensions.spacings.m};
                  margin: ${designSystem.dimensions.spacings.m}
                    ${designSystem.dimensions.spacings.m}
                    ${designSystem.dimensions.spacings.xl} 0;
                `}
              >
                <SpacingsStack scale="m">
                  <PlaceholderPageHeaderSide />
                  <PlaceholderPageHeaderSideBannerArea />
                </SpacingsStack>
              </div>
              {navigationContainer}
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
          label="Open page navigation"
          onClick={() => {
            setMenuOpen(true);
          }}
        />
      </ToggleMenuButton>
      <GridContainer>
        <StickyContainer>
          {[searchContainer, navigationContainer]}
        </StickyContainer>
      </GridContainer>
    </>
  );
};
LayoutPageNavigation.displayName = 'LayoutPageNavigation';
LayoutPageNavigation.propTypes = {
  isSearchBoxInView: PropTypes.bool.isRequired,
  excludeFromSearchIndex: PropTypes.bool.isRequired,
  openSearchDialog: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  tableOfContents: PropTypes.shape({
    items: PropTypes.array,
  }),
  navLevels: PropTypes.number.isRequired,
  beta: PropTypes.bool.isRequired,
};

export default LayoutPageNavigation;
