import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

const Container = styled.div`
  display: flex;
  width: calc(100% / 3);
  max-width: calc(100% / 3);
  flex-direction: column;
  background-color: aqua;
  border: 1px solid black;
  transition: transform 0.3s ease; /* Add a transition for smooth animation */
  transform: translateX(0); /* Initially, the columns are not translated */
`;

const getMenuItemStyle = (props) => css`
  border: 1px solid black;
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

const MenuItem = (props) => {
  const onClickHandler = () => {
    if (props.href) {
      console.log('perform navigation to', props.href);
    } else {
      props.onSelected();
    }
  };
  return (
    <div
      onClick={onClickHandler}
      css={[getMenuItemStyle(props), getMenuItemStyleConditionalStyles(props)]}
    >
      {props.icon} - {props.text}
    </div>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onSelected: PropTypes.func,
  href: PropTypes.string,
};

export const MenuColumn = (props) => {
  const [localItems, setLocalItems] = useState([]);
  useEffect(() => {
    setLocalItems(preProcessItems(props.items));
  }, [props.items]);

  const menuItem = (item, index) => {
    let isLabel = false;
    let text = item.title;
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
        onSelected={() => !isLabel && props.onSelected(props.level, index)}
      />
    );
  };

  return props.isExpanded ? (
    <Container>{localItems?.map(menuItem)}</Container>
  ) : null;
};

MenuColumn.propTypes = {
  level: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  isExpanded: PropTypes.bool.isRequired,
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

export const preProcessItems = (items) => {
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
