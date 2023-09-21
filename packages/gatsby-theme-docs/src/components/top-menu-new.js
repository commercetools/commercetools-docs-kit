import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { LordIcon, designSystem } from '@commercetools-docs/ui-kit';
import { AngleRightIcon } from '@commercetools-uikit/icons';

const openColumnAnimation = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
    width: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    width: ${designSystem.dimensions.widths.topMenuSingleCoumn};
  }
`;

const closeColumnAnimation = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    width: ${designSystem.dimensions.widths.topMenuSingleCoumn}
  }
  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
    width: 0;
  }
`;

const firstColumnExpandAnimation = keyframes`
  from { width: ${designSystem.dimensions.widths.topMenuSingleCoumnShrink} }
  to { width: ${designSystem.dimensions.widths.topMenuSingleCoumn} }
`;

const firstColumnShrinkAnimation = keyframes`
  from { width: ${designSystem.dimensions.widths.topMenuSingleCoumn} }
  to { width: ${designSystem.dimensions.widths.topMenuSingleCoumnShrink} }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MenuColumnContainer = styled.div`
  background-color: white;
  display: flex;
  z-index: ${(props) => (props.level < 3 ? '1' : '0')};
  position: relative;
  flex-direction: column;
  overflow: hidden;
  width: ${(props) =>
    props.level === 3
      ? '0'
      : designSystem.dimensions.widths.topMenuSingleCoumn};

  // 1st column shrink animation
  ${(props) =>
    props.level === 1 &&
    props.areAllColumsExpanded &&
    css`
      @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
        animation: ${firstColumnShrinkAnimation} 0.3s ease-out;
        animation-fill-mode: forwards;
      }
      @media screen and (${designSystem.dimensions.viewports.desktop}) {
        animation: none;
        animation-fill-mode: none;
      }
    `}

  // 1st column expand animation
  ${(props) =>
    props.level === 1 &&
    props.columnTouched &&
    !props.areAllColumsExpanded &&
    css`
      @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
        animation: ${firstColumnExpandAnimation} 0.3s ease-out;
        animation-fill-mode: forwards;
      }
      @media screen and (${designSystem.dimensions.viewports.desktop}) {
        animation: none;
        animation-fill-mode: none;
      }
    `}

  // 3rd column slide animation (open)
  ${(props) =>
    props.level === 3 &&
    props.isExpanded &&
    css`
      animation: ${openColumnAnimation} 0.3s ease-out;
      animation-fill-mode: forwards;
    `}

  // 3rd column slide animation (close)
  ${(props) =>
    props.level === 3 &&
    !props.isExpanded &&
    props.localItems?.length > 0 &&
    css`
      animation: ${closeColumnAnimation} 0.3s ease-out;
      animation-fill-mode: backwards;
      animation-delay: 0.25s;
    `}
`;

const getMenuItemStyle = (props) => css`
  display: flex;
  align-items: center;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    ${props.level === 1 &&
    props.areAllColumsExpanded &&
    css`
      display: none;
    `}

    ${props.level === 1 &&
    !props.areAllColumsExpanded &&
    props.columnTouched &&
    css`
      display: flex;
      & p {
        opacity: 0;
        animation: ${fadeIn} 0.3s ease-in-out 0.15s forwards;
      }
    `}
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    display: flex;
    & p {
      opacity: 1;
      animation: none;
    }
  }
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

export const MenuItem = (props) => {
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

      <div css={[getMenuItemStyle(props)]}>
        <p>{props.text}</p>
      </div>

      {props.isExpandible && (
        <ExpandItemIcon isSelected={props.isSelected}>
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
  // eslint-disable-next-line react/no-unused-prop-types
  level: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  columnTouched: PropTypes.bool,
};

export const MenuLabelItem = styled.div`
  font-weight: ${designSystem.typography.fontWeights['light-bold']};
  padding: 0 8px;
  margin-top: ${({ isFirstItem }) => (!isFirstItem ? '20px' : '0')};
`;

MenuLabelItem.propTypes = {
  isFirstItem: PropTypes.bool,
};

const ExpandItemIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  & svg {
    fill: ${({ isSelected }) =>
      isSelected
        ? designSystem.colors.light.selectedItemText
        : designSystem.colors.light.colorSolid};
  }
`;

const showContentAnimation = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

const hideContentAnimation = keyframes`
  from {opacity: 1;}
  to {opacity: 0;}
`;

const MenuColumWrapper = styled.div`
  padding: 24px 16px;

  ${(props) =>
    props.level === 3 &&
    css`
      opacity: 0;
    `}

  ${(props) =>
    props.level === 3 &&
    props.isExpanded &&
    css`
      animation: ${showContentAnimation} 0.25s ease-out;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    `}

  ${(props) =>
    props.level === 3 &&
    !props.isExpanded &&
    css`
      animation: ${hideContentAnimation} 0.25s ease-out;
      animation-fill-mode: backwards;
    `}
`;

export const MenuColumn = (props) => {
  const [localItems, setLocalItems] = useState([]);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    setLocalItems(flattenLabels(props.items));
  }, [props.items, props.isExpanded]);

  const handleAnimationEnded = () => {
    if (props.level === 3 && !props.isExpanded) {
      // wait until the animation completely finished
      setTimeout(() => setLocalItems([]), 400);
    }
  };

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
        level={props.level}
        key={index}
        icon={item.icon}
        text={text}
        href={item.href}
        isSelected={isSelected}
        isExpandible={!isLabel && !!item.items}
        areAllColumsExpanded={props.areAllColumsExpanded}
        columnTouched={touched}
        onSelected={() => {
          if (!isLabel) {
            props.onSelected(props.level, index);
            setTouched(true);
          }
        }}
      />
    );
  };

  return (
    <MenuColumnContainer
      {...props}
      localItems={localItems}
      columnTouched={touched}
    >
      {localItems?.length > 0 && (
        <MenuColumWrapper onAnimationEnd={handleAnimationEnded} {...props}>
          {localItems?.map(renderMenuItem)}
        </MenuColumWrapper>
      )}
    </MenuColumnContainer>
  );
};

MenuColumn.propTypes = {
  level: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  isExpanded: PropTypes.bool.isRequired,
  areAllColumsExpanded: PropTypes.bool.isRequired,
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
