import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import TopMenuBannerArea from '../overrides/top-menu-banner-area';
import GlobalNavigationLink from './global-navigation-link';
import BetaTag from './beta-tag';
import useTopMenuItems from '../hooks/use-top-menu-items';
import { BottomItems, MenuColumn, flattenLabels } from './top-menu-new';

const slideOpenAnimation = keyframes`
  from { margin-top: -50%; }
  to { margin-top: 0; }
`;
const slideOpenAnimationMobile = keyframes`
  from { margin-top: -150%; }
  to { margin-top: 0; }
`;

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
`;
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0;
  padding: 0;

  height: 100%; /* For browsers that do not support this property yet */
  height: -moz-fit-content;
  height: fit-content;

  animation: ${slideOpenAnimation} 0.15s ease-out alternate;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    animation: ${slideOpenAnimationMobile} 0.15s ease-out alternate;
  }
`;
const centeredContainerStyle = css`
  width: 100%;
  display: block;
  max-width: ${designSystem.dimensions.widths.pageContent};
  margin: 0 auto;
`;
const contentGridStyle = css`
  width: 100%;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'menu-main' 1fr [row1-end]
    / 1fr;

  /* @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.spacings.xl}
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.spacings.xl}
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigationSmall}
      minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  } */
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation}
      ${designSystem.dimensions.widths.pageContentWithMargins}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const LeftBlank = styled.div`
  grid-area: menu-left-blank;
`;
const Center = styled.div`
  grid-area: menu-main;
  background-color: red;
  /* width: calc(100% - ${designSystem.dimensions.spacings.m}); */

  /* @media screen and (${designSystem.dimensions.viewports.mobile}) {
    width: 100%;
    margin: 0;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(100% - ${designSystem.dimensions.spacings.xl});
    margin: 0;
  } */
`;
const Columns = styled.div`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns:
    repeat(${(props) => React.Children.count(props.children) - 1}, 1fr)
    25%;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    grid-template-columns: 1fr;

    > * + * {
      border-top: 1px solid ${designSystem.colors.light.borderSecondary};
    }
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;
const SideColumn = styled(Column)`
  border-left: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-left: ${designSystem.dimensions.spacings.xl};

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    border-left: unset;
    padding-left: ${designSystem.dimensions.spacings.m};
  }
`;
const ColumnTitle = styled.div`
  color: ${designSystem.colors.light.textFaded};
  border-bottom: 1px solid ${designSystem.colors.light.borderSecondary};
  padding: 0 0 ${designSystem.dimensions.spacings.s} 0;
  min-height: ${designSystem.dimensions.heights.megaMenuItemTitle};
  display: flex;
  align-items: flex-end;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    border-bottom: unset;
    min-height: auto;
    display: block;
    align-items: normal;
  }
`;

const TopMenu = (props) => {
  const { topMenuItems } = useTopMenuItems();
  const [level2Items, setLevel2Items] = useState();
  const [level3Items, setLevel3Items] = useState();
  const [columnCount, setColumnCount] = useState(2);
  const [selectedItems, setSelectedItems] = useState(['0-0']);

  const onMenuItemSelected = (level, idx) => {
    if (selectedItems.length === 0) {
      // selected items is empty, nothing to worry
      setSelectedItems([`${level}-${idx}`]);
    } else {
      if (level === 1) {
        // we're changing the root selection, let's just reset selected items
        setSelectedItems([`${level}-${idx}`]);
      } else {
        // changing a 2nd level item, keeps the first level selection
        const localCopy =
          selectedItems.length > 1
            ? selectedItems.slice(0, -1)
            : [...selectedItems];

        localCopy.push(`${level}-${idx}`);
        setSelectedItems(localCopy);
      }
    }
  };

  const getSelectedIndex = (level) => {
    if (selectedItems?.[level]) {
      return parseInt(selectedItems[level].split('-')[1], 10);
    }
  };

  useEffect(() => {
    let indexLevel1;
    let indexLevel2;
    if (selectedItems[0]) {
      indexLevel1 = selectedItems[0].split('-')[1];
      const selectedLevel1 = topMenuItems[indexLevel1];
      if (selectedLevel1?.items?.length > 0) {
        setLevel2Items(selectedLevel1.items);
        setColumnCount(2);
      }
    }
    if (selectedItems[1]) {
      indexLevel2 = selectedItems[1].split('-')[1];
      const baseItems = flattenLabels(topMenuItems[indexLevel1].items);
      const selectedLevel2 = baseItems[indexLevel2];
      if (selectedLevel2?.items?.length > 0) {
        setLevel3Items(selectedLevel2.items);
        setColumnCount(3);
      }
    }
  }, [selectedItems, topMenuItems]);

  return (
    <Container>
      <Content
        role="top-menu"
        aria-labelledby="top-menu-switcher"
        onClick={(event) => {
          // Prevent overlay to close when clicking on the content area.
          event.stopPropagation();
        }}
      >
        <div css={props.centered ? centeredContainerStyle : contentGridStyle}>
          <LeftBlank />
          <Center>
            <MenuContainer columnCount={columnCount}>
              <MenuTop>
                <MenuColumn
                  isExpanded={true}
                  items={topMenuItems}
                  level={1}
                  selectedIndex={getSelectedIndex(0)}
                  onSelected={onMenuItemSelected}
                />
                <MenuColumn
                  isExpanded={true}
                  items={level2Items}
                  onSelected={onMenuItemSelected}
                  selectedIndex={getSelectedIndex(1)}
                  level={2}
                />
                <MenuColumn
                  isExpanded={selectedItems?.length >= 2}
                  items={level3Items}
                  level={3}
                  onSelected={onMenuItemSelected}
                />
              </MenuTop>
              <MenuBottom>
                <ItemsWrapper>
                  <BottomItems
                    items={topMenuItems.filter((item) => item.footerTitle)}
                  />
                </ItemsWrapper>
                <FeedbackWrapper>Feedback</FeedbackWrapper>
              </MenuBottom>
            </MenuContainer>
          </Center>
        </div>
      </Content>
    </Container>
  );
};

TopMenu.propTypes = {
  centered: PropTypes.bool,
};

const MenuTop = styled.div`
  display: flex;
  flex-basis: auto;
`;

const MenuBottom = styled.div`
  background-color: lightgray;
  display: flex;
`;

const ItemsWrapper = styled.div``;
const FeedbackWrapper = styled.div`
  background-color: bisque;
`;

const MenuContainer = styled.div`
  background-color: transparent;
`;
export default TopMenu;
