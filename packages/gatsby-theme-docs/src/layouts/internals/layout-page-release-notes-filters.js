import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { createStyledIcon, designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { CloseIcon } from '@commercetools-uikit/icons';
import UnstyledStackedLinesIndentedIcon from '../../icons/stacked-lines-indented-icon.svg';
import { Overlay } from '../../components';
import ReleaseNotesFilterDates from '../../components/release-notes-filter-dates';
import ReleaseNotesFilterTopics from '../../components/release-notes-filter-topics';

const StackedLinesIndentedIcon = createStyledIcon(
  UnstyledStackedLinesIndentedIcon
);

const slideInAnimation = keyframes`
  from { margin-right: -100%; }
  to { margin-right: 0; }
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
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};
  margin-top: ${designSystem.dimensions.spacings.wide};

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
  padding-left: ${designSystem.dimensions.spacings.m};
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

const LayoutPageReleaseNotesFilters = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [modalPortalNode, setModalPortalNode] = React.useState();
  React.useEffect(() => {
    setModalPortalNode(document.getElementById('modal-portal'));
  }, []);

  const filtersContainer = (
    <IntlProvider locale="en">
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
          <SecondaryIconButton
            icon={<CloseIcon size="medium" />}
            label="Close release notes filters"
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        </SpacingsInline>
        <ReleaseNotesFilterDates />
        <ReleaseNotesFilterTopics />
      </SpacingsStack>
    </IntlProvider>
  );

  if (isMenuOpen) {
    return modalPortalNode
      ? ReactDOM.createPortal(
          <Overlay
            justifyContent="flex-end"
            // onClick={() => {
            //   // setMenuOpen(false);
            // }}
          >
            <SlidingContainer>{filtersContainer}</SlidingContainer>
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
        <StickyContainer>{filtersContainer}</StickyContainer>
      </GridContainer>
    </>
  );
};
LayoutPageReleaseNotesFilters.displayName = 'LayoutPageReleaseNotesFilters';

export default LayoutPageReleaseNotesFilters;
