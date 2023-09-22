import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useTopMenuItems from '../hooks/use-top-menu-items';
import { designSystem } from '@commercetools-docs/ui-kit';
import { AngleLeftIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import { useEffect, useState } from 'react';
import { flattenLabels } from './top-menu-components';
import { TopMenuItem, TopMenuLabelItem } from './top-menu-item';

const Container = styled.div`
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: 16px 24px;
`;

const MenuNavigationArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px 16px 2px;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const GoBackButton = styled.div`
  display: flex;
  align-items: center;
  color: ${designSystem.colors.light.selectedItemText};
  fill: ${designSystem.colors.light.selectedItemText};
  cursor: pointer;
`;

const PanelsContainer = styled.div``;

const TopMenuMobile = (props) => {
  const { topMenuItems } = useTopMenuItems();
  const [currentPanel, setCurrentPanel] = useState(1);
  const [level2Items, setLevel2Items] = useState();
  const [level3Items, setLevel3Items] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleGoBackClick = () => {
    setSelectedItems(selectedItems.slice(0, -1));
  };

  const onMenuItemSelected = (level, idx) => {
    if (selectedItems.length === 0) {
      // selected items is empty, nothing to worry
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
  };

  useEffect(() => {
    let indexLevel1;
    let indexLevel2;
    if (selectedItems[0]) {
      indexLevel1 = selectedItems[0].split('-')[1];
      const selectedLevel1 = topMenuItems[indexLevel1];
      if (selectedLevel1?.items?.length > 0) {
        setLevel2Items(selectedLevel1.items);
      }
    }
    if (selectedItems[1]) {
      indexLevel2 = selectedItems[1].split('-')[1];
      const baseItems = flattenLabels(topMenuItems[indexLevel1].items);
      const selectedLevel2 = baseItems[indexLevel2];
      if (selectedLevel2?.items?.length > 0) {
        setLevel3Items(selectedLevel2.items);
      }
    }
  }, [topMenuItems, selectedItems]);

  useEffect(() => {
    setCurrentPanel((selectedItems?.length || 0) + 1);
  }, [selectedItems]);

  return (
    <Container>
      <MenuNavigationArea>
        {currentPanel > 1 ? (
          <GoBackButton onClick={handleGoBackClick}>
            <AngleLeftIcon />
            <p>Go back</p>
          </GoBackButton>
        ) : (
          <div></div>
        )}
        <CloseButton onClick={props.closeTopMenu}>
          <CloseBoldIcon />
        </CloseButton>
      </MenuNavigationArea>
      <PanelsContainer>
        {currentPanel === 1 && (
          <ColumnPanel
            level={0}
            onSelected={onMenuItemSelected}
            items={topMenuItems}
          />
        )}
        {currentPanel === 2 && (
          <ColumnPanel
            level={1}
            onSelected={onMenuItemSelected}
            items={level2Items}
          />
        )}
        {currentPanel === 3 && (
          <ColumnPanel
            level={2}
            onSelected={onMenuItemSelected}
            items={level3Items}
          />
        )}
      </PanelsContainer>
    </Container>
  );
};

TopMenuMobile.propTypes = {
  closeTopMenu: PropTypes.func.isRequired,
};

const ColumnPanel = (props) => {
  const [localItems, setLocalItems] = useState([]);
  useEffect(() => {
    setLocalItems(flattenLabels(props.items));
  }, [props.items]);

  const renderMenuItem = (item, index) => {
    let isLabel = false;
    let text = item.title;
    const isSelected = false;

    if (item.label) {
      isLabel = true;
      text = item.label;
    }
    if (item.menuTitle) {
      text = item.menuTitle;
    }

    return isLabel ? (
      <TopMenuLabelItem key={index}>{text}</TopMenuLabelItem>
    ) : (
      <TopMenuItem
        id={`item-${props.level}-${index}`}
        level={props.level}
        key={index}
        text={text}
        href={item.href}
        isSelected={isSelected}
        isExpandible={!isLabel && !!item.items}
        onSelected={() => {
          if (!isLabel) {
            props.onSelected(props.level, index);
          }
        }}
      />
    );
  };

  ColumnPanel.propTypes = {
    level: PropTypes.number,
    onSelected: PropTypes.func,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        footerTitle: PropTypes.string,
        href: PropTypes.string,
        icon: PropTypes.string,
        title: PropTypes.string,
        beta: PropTypes.bool,
      }).isRequired
    ),
  };

  return <div>{localItems?.map(renderMenuItem)}</div>;
};

export default TopMenuMobile;
