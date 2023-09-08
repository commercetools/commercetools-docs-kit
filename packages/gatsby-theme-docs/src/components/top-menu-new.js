import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';

const rightSlideOpenAnimation = keyframes`
  from {
    transform: width(0);
  }
  to {
    transform: width(33%);
  }
`;

const Container = styled.div`
  display: flex;
  ${(props) => (props.isExpanded ? `width: calc(100% / 3);` : 'width: 0;')};
  max-width: calc(100% / 3);
  flex-direction: column;
  background-color: aqua;
  border: 1px solid black;
  overflow: hidden;
  white-space: nowrap;
  transition: width 0.15s ease-in-out;
`;

const getMenuItemStyle = (props) => css`
  background-color: ${props.isSelected ? 'lightgreen' : 'transparent'};
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
