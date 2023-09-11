import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { LordIcon } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  display: flex;
  ${(props) => (props.isExpanded ? `width: calc(100% / 3);` : 'width: 0;')};
  max-width: calc(100% / 3);
  flex-direction: column;
  background-color: aqua;
  overflow: hidden;
  white-space: nowrap;
  transition: width 0.15s ease-in-out;
  padding: 2px;
`;

const getMenuItemStyle = (props) => css`
  background-color: ${props.isSelected ? 'lightgreen' : 'transparent'};
`;

const getMenuItemStyleConditionalStyles = (props) => {
  return !props.isLabel
    ? css`
        cursor: pointer;
        &:hover {
          background-color: lightcoral;
        }
      `
    : css`
        font-weight: bold;
      `;
};

const MenuIconWrapper = styled.div`
  height: 24px;
  width: 24px;
  padding: 5px;

  & svg {
    height: 24px;
    width: 24px;
  }
`;

const MenuItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
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
    <MenuItemWrapper>
      <MenuIconWrapper>
        {props.icon && (
          <LordIcon
            trigger="hover"
            iconName={props.icon}
            height="24"
            width="24"
          />
        )}
      </MenuIconWrapper>
      <div
        onClick={onClickHandler}
        css={[
          getMenuItemStyle(props),
          getMenuItemStyleConditionalStyles(props),
        ]}
      >
        {props.text}
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
    <Container isExpanded={props.isExpanded}>
      {localItems?.map(renderMenuItem)}
    </Container>
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
