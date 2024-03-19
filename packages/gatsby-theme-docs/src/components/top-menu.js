import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { MediaQuery, designSystem } from '@commercetools-docs/ui-kit';
import useTopMenuItems from '../hooks/use-top-menu-items';
import {
  BottomItems,
  MenuColumn,
  preProcessColumnItems,
} from './top-menu-components';
import TopMenuMobile from './top-menu-mobile';
import { usePrevious } from '../hooks/use-previous';
import TopMenuBannerArea from '../overrides/top-menu-banner-area';

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
  font-size: ${designSystem.typography.fontSizes.small};
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
const contentGridStyle = (areAllColumsExpanded) => css`
  width: 100%;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'menu-main' 1fr [row1-end]
    / 1fr;
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / ${areAllColumsExpanded ? '0' : '57px'}
      ${designSystem.dimensions.widths.topMenuTwoColums}
      0;
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / 57px
      ${designSystem.dimensions.widths.topMenuTreeColums}
      0;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'menu-left-blank menu-main menu-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageNavigation}
      ${designSystem.dimensions.widths.topMenuTreeColums}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const LeftBlank = styled.div`
  grid-area: menu-left-blank;
`;
const Center = styled.div`
  grid-area: menu-main;
`;

const TopMenu = (props) => {
  const { topMenuItems } = useTopMenuItems();
  const [level2Items, setLevel2Items] = useState();
  const [level3Items, setLevel3Items] = useState();
  const [columnCount, setColumnCount] = useState(2);
  const [selectedItems, setSelectedItems] = useState(['1-0']);
  const [isBackToRoot, setIsBackToRoot] = useState(false);
  const previousSelectedItems = usePrevious(selectedItems);
  const [areAllColumsExpanded, setAreAllColumnsExpanded] = useState(false);

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
      const baseItems = preProcessColumnItems(topMenuItems[indexLevel1].items);
      const selectedLevel2 = baseItems[indexLevel2];
      if (selectedLevel2?.items?.length > 0) {
        setLevel3Items(selectedLevel2.items);
        setColumnCount(3);
      }
    }

    setAreAllColumnsExpanded(selectedItems?.length >= 2);
  }, [selectedItems, topMenuItems]);

  useEffect(() => {
    if (
      selectedItems?.length === 1 &&
      selectedItems?.length < previousSelectedItems?.length
    ) {
      // keeps track of the first time user navigates back to the root column for css animation purpose
      setIsBackToRoot(true);
    }
  }, [previousSelectedItems, selectedItems]);

  return (
    <Container>
      <Content role="top-menu" aria-labelledby="top-menu-switcher">
        <div
          css={
            props.centered
              ? centeredContainerStyle
              : contentGridStyle(areAllColumsExpanded)
          }
        >
          <LeftBlank onClick={props.closeTopMenu} />
          <Center onClick={props.closeTopMenu}>
            <MediaQuery forViewport="largeTablet" hideIfMatch>
              <TopMenuMobile
                onMenuItemSelected={onMenuItemSelected}
                closeTopMenu={props.closeTopMenu}
              />
            </MediaQuery>
            <MediaQuery forViewport="largeTablet">
              <MenuContainer
                data-testid="desktop-top-menu"
                columnCount={columnCount}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuTop>
                  <MenuColumn
                    isExpanded={true}
                    areAllColumsExpanded={areAllColumsExpanded}
                    items={topMenuItems}
                    level={1}
                    selectedIndex={getSelectedIndex(0)}
                    onSelected={onMenuItemSelected}
                    shouldShrink={isBackToRoot}
                  />
                  <MenuColumn
                    isExpanded={true}
                    areAllColumsExpanded={areAllColumsExpanded}
                    items={level2Items}
                    onSelected={onMenuItemSelected}
                    selectedIndex={getSelectedIndex(1)}
                    level={2}
                  />
                  <MenuColumn
                    isExpanded={selectedItems?.length >= 2}
                    areAllColumsExpanded={areAllColumsExpanded}
                    items={level3Items}
                    level={3}
                    onSelected={onMenuItemSelected}
                  />
                </MenuTop>
                <MenuBottom>
                  <ItemsArea>
                    <BottomItems
                      items={topMenuItems.filter((item) => item.footerTitle)}
                    />
                  </ItemsArea>

                  <FeedbackArea isVisible={selectedItems?.length >= 2}>
                    <TopMenuBannerArea />
                  </FeedbackArea>
                </MenuBottom>
              </MenuContainer>
            </MediaQuery>
          </Center>
        </div>
      </Content>
    </Container>
  );
};

TopMenu.propTypes = {
  centered: PropTypes.bool,
  closeTopMenu: PropTypes.func,
};

const MenuTop = styled.div`
  display: inline-flex;
`;

const MenuBottom = styled.div`
  background-color: ${designSystem.colors.light.surfaceForTopMenuBottom};
  display: inline-flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: space-between;
`;

const ItemsArea = styled.div`
  width: ${designSystem.dimensions.widths.topMenuSingleCoumn};
`;
const FeedbackArea = styled.div`
  padding-right: 40px;
  display: none;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    display: flex;
  }
`;

const MenuContainer = styled.div`
  background-color: ${designSystem.colors.light.surfacePrimary};
  display: inline-flex;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
export default TopMenu;
