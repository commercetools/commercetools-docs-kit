import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { LordIcon, designSystem } from '@commercetools-docs/ui-kit';
import { AngleRightIcon } from '@commercetools-uikit/icons';

const expandColumnAnimation = keyframes`
  from { left:-376px }
  to { left: 0 }
`;

const MenuColumnContainer = styled.div`
  background-color: white;
  display: flex;
  z-index: ${(props) => (props.level < 3 ? '1' : '0')};
  position: relative;
  flex-direction: column;
  overflow: hidden;
  left: ${(props) => (props.level === 3 ? '-376px' : '0')};

  ${(props) =>
    props.isExpanded &&
    props.level === 3 &&
    css`
      animation: ${expandColumnAnimation} 0.3s ease-out;
      animation-fill-mode: forwards;
    `}
`;

const getMenuItemStyle = (props) => css`
  display: flex;
  align-items: center;
`;

const MenuIconWrapper = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid ${designSystem.colors.light.surfaceSecondary2};
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px hsla(0, 0%, 41%, 0.15);
  margin-right: 16px;
  background-color: ${designSystem.colors.light.surfacePrimary};

  & svg {
    height: 30px;
    width: 30px;
  }
`;

const MenuItemWrapper = styled.div`
  display: flex;
  padding: 8px 12px 8px 8px;
  height: 32px;

  &:hover {
    background-color: ${designSystem.colors.light.selectedItemBackground};
    border-radius: 4px;
    cursor: pointer;
    color: ${designSystem.colors.light.selectedItemText};
    & :last-child {
      visibility: visible;
    }
  }

  ${(props) =>
    props.isSelected &&
    `
    border: 1px solid ${designSystem.colors.light.selectedItem};
    border-radius: 4px;
    background-color: ${designSystem.colors.light.selectedItemBackground};
    color: ${designSystem.colors.light.selectedItemText};
    font-weight: ${designSystem.typography.fontWeights['light-bold']}
  `}
`;

const MenuItem = (props) => {
  const onClickHandler = () => {
    if (props.href) {
      navigate(props.href);
    } else if (props.onSelected) {
      props.onSelected();
    }
  };
  return (
    <MenuItemWrapper
      id={props.id}
      onClick={onClickHandler}
      isSelected={props.isSelected}
    >
      {props.icon && (
        <MenuIconWrapper>
          <LordIcon
            trigger="hover"
            iconName={props.icon}
            target={`#${[props.id]}`}
            height="30"
            width="30"
          />
        </MenuIconWrapper>
      )}
      {!props.isMini && (
        <div css={[getMenuItemStyle(props)]}>
          <p>{props.text}</p>
        </div>
      )}
      {(props.isExpandible || props.isMini) && (
        <ExpandItemIcon isVisible={props.isMini || props.isSelected}>
          <AngleRightIcon size="medium" />
        </ExpandItemIcon>
      )}
    </MenuItemWrapper>
  );
};

MenuItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  onSelected: PropTypes.func,
  href: PropTypes.string,
  isSelected: PropTypes.bool,
  isExpandible: PropTypes.bool,
  isMini: PropTypes.bool,
};

const MenuLabelItem = styled.div`
  font-weight: ${designSystem.typography.fontWeights['light-bold']};
  padding: 0 12px;
  margin-top: ${({ isFirstItem }) => (!isFirstItem ? '20px' : '0')};
`;

MenuLabelItem.propTypes = {
  isFirstItem: PropTypes.bool,
};

const ExpandItemIcon = styled.div`
  display: flex;
  visibility: ${({ isVisible }) => (isVisible ? 'display' : 'hidden')};
  align-items: center;
  margin-left: auto;
  & svg {
    fill: ${designSystem.colors.light.selectedItemText};
  }
`;

const MenuColumWrapper = styled.div`
  padding: 24px 16px;
`;

export const MenuColumn = (props) => {
  const [localItems, setLocalItems] = useState([]);
  useEffect(() => {
    setLocalItems(flattenLabels(props.items));
  }, [props.items]);

  const renderMenuItem = (item, index) => {
    let isLabel = false;
    let text = item.title;
    const isSelected = props.selectedIndex === index;

    if (item.label) {
      isLabel = true;
      text = item.label;
    }
    if (item.menuTitle) {
      text = item.menuTitle;
    }

    return isLabel ? (
      <MenuLabelItem key={index} isFirstItem={index === 0}>
        {text}
      </MenuLabelItem>
    ) : (
      <MenuItem
        id={`item-${props.level}-${index}`}
        key={index}
        icon={item.icon}
        text={text}
        href={item.href}
        isSelected={isSelected}
        isExpandible={!isLabel && !!item.items}
        onSelected={() => !isLabel && props.onSelected(props.level, index)}
      />
    );
  };

  return (
    <MenuColumnContainer {...props}>
      <MenuColumWrapper>{localItems?.map(renderMenuItem)}</MenuColumWrapper>
    </MenuColumnContainer>
  );
};

MenuColumn.propTypes = {
  level: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  isExpanded: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      menuTitle: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
      label: PropTypes.string,
      beta: PropTypes.bool,
    }).isRequired
  ),
};

export const BottomItems = (props) => {
  return (
    <MenuColumWrapper>
      {props.items.map((item, index) => (
        <MenuItem
          id={`boottom-item-${index}`}
          key={index}
          icon={item.icon}
          text={item.footerTitle}
          href={item.href}
        />
      ))}
    </MenuColumWrapper>
  );
};

BottomItems.propTypes = {
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

export const flattenLabels = (items) => {
  const processedItems = [];
  if (!items) {
    return processedItems;
  }
  items.forEach((element) => {
    if (element.footerTitle) {
      return;
    }
    if (element.label) {
      processedItems.push(element);
      element.items.forEach((subElement) => processedItems.push(subElement));
    } else {
      processedItems.push(element);
    }
  });
  return processedItems;
};
