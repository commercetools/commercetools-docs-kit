import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import { TopMenuLabelItem, TopMenuItem } from './top-menu-item';

/** Columns animations */
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
    props.shouldShrink &&
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

/** content hide/show animations */
const showContentAnimation = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

const hideContentAnimation = keyframes`
  from {opacity: 1;}
  to {opacity: 0;}
`;

const MenuColumWrapper = styled.div`
  padding: 16px;

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
      white-space: nowrap;
      overflow: hidden;
    `}
`;

export const MenuColumn = (props) => {
  const [localItems, setLocalItems] = useState([]);
  useEffect(() => {
    setLocalItems(preProcessColumnItems(props.items));
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
      <TopMenuLabelItem key={index} isFirstItem={index === 0}>
        {text}
      </TopMenuLabelItem>
    ) : (
      <TopMenuItem
        id={`item-${props.level}-${index}`}
        level={props.level}
        key={index}
        icon={item.icon}
        text={text}
        href={item.href}
        isSelected={isSelected}
        isExpandable={!isLabel && !!item.items}
        areAllColumsExpanded={props.areAllColumsExpanded}
        shouldShrink={props.shouldShrink}
        onSelected={() => {
          if (!isLabel) {
            props.onSelected(props.level, index);
          }
        }}
      />
    );
  };
  return (
    <MenuColumnContainer {...props} localItems={localItems}>
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
  shouldShrink: PropTypes.bool,
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
        <TopMenuItem
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

/**
 * Items grouped under a label, must be flattened to
 * simplify rendering (they're rendered as normal items under the label)
 */
const flattenLabels = (items) => {
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

/**
 * This sorting function has the sole purpose of enforce that,
 * for each item list (column), the expandable items (items with children) are
 * displayed first, and lastly all the direct link items. This is mainly to ensure
 * the layout of the menu is consistent since the direct link items have smaller height than
 * the expandable ones
 */
export const sortItems = (items) => {
  const groupedItems = items.reduce(
    (prev, curr) => {
      prev[curr.href || curr.label ? 'linkItems' : 'expandableItems'].push(
        curr
      );
      return prev;
    },
    { expandableItems: [], linkItems: [] }
  );

  return [...groupedItems.expandableItems, ...groupedItems.linkItems];
};

export const preProcessColumnItems = (items) => {
  const flattenedItems = flattenLabels(items);
  return sortItems(flattenedItems);
};
