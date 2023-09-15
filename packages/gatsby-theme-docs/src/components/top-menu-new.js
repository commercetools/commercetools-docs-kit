import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { LordIcon, designSystem } from '@commercetools-docs/ui-kit';

const MenuColumnContainer = styled.div`
  display: flex;
  ${(props) =>
    props.isExpanded ? `flex: 0 0 calc(100% / 3);` : 'flex: 0 0 0'};
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  transition: flex 0.5s ease-in-out;
`;

const getMenuItemStyle = (props) => css`
  display: flex;
  align-items: center;
`;

const getMenuItemStyleConditionalStyles = (props) => {
  return !props.isLabel
    ? css`
        cursor: pointer;
        &:hover {
          background-color: transparent;
        }
      `
    : css`
        font-weight: bold;
      `;
};

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
  padding: 12px;
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
      console.log('perform navigation to', props.href);
    } else {
      props.onSelected();
    }
  };
  return (
    <MenuItemWrapper isSelected={props.isSelected}>
      {props.icon && (
        <MenuIconWrapper>
          <LordIcon
            trigger="hover"
            iconName={props.icon}
            height="30"
            width="30"
          />
        </MenuIconWrapper>
      )}
      <div
        onClick={onClickHandler}
        css={[
          getMenuItemStyle(props),
          getMenuItemStyleConditionalStyles(props),
        ]}
      >
        <p>{props.text}</p>
      </div>
    </MenuItemWrapper>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onSelected: PropTypes.func,
  href: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  isSelected: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  isLabel: PropTypes.bool,
};

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

    return (
      <MenuItem
        isLabel={isLabel}
        key={index}
        icon={item.icon}
        text={text}
        href={item.href}
        isSelected={isSelected}
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
  return props.items.map((item, index) => (
    <MenuItem
      key={index}
      icon={item.icon}
      text={item.footerTitle}
      href={item.href}
      onSelected={() => console.log('navigate')}
    />
  ));
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
