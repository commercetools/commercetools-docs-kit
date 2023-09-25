import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { LordIcon, designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { AngleRightIcon } from '@commercetools-uikit/icons';

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
    padding: 7px 11px 7px 7px;
    border: 1px solid ${designSystem.colors.light.selectedItem};
    border-radius: 4px;
    background-color: ${designSystem.colors.light.selectedItemBackground};
    color: ${designSystem.colors.light.selectedItemText};
    font-weight: ${designSystem.typography.fontWeights['light-bold']}
  `}
`;

MenuItemWrapper.propTypes = {
  isSelected: PropTypes.bool,
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

ExpandItemIcon.propTypes = {
  isSelected: PropTypes.bool,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const getMenuItemStyle = (props) => css`
  display: flex;
  align-items: center;
  font-size: ${props.level === 1
    ? '15px'
    : designSystem.typography.fontSizes.small};
  font-weight: ${props.level === 1
    ? designSystem.typography.fontWeights.medium
    : designSystem.typography.fontWeights.regular};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    ${props.level === 1 &&
    props.areAllColumsExpanded &&
    css`
      display: none;
    `}

    ${props.level === 1 &&
    !props.areAllColumsExpanded &&
    props.shouldShrink &&
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

export const TopMenuItem = (props) => {
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
            trigger="morph"
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

TopMenuItem.propTypes = {
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
  shouldShrink: PropTypes.bool,
};

export const TopMenuLabelItem = styled.div`
  font-weight: ${designSystem.typography.fontWeights['light-bold']};
  padding: 0 8px 4px 8px;
  margin-top: ${({ isFirstItem }) => (!isFirstItem ? '20px' : '0')};
`;

TopMenuLabelItem.propTypes = {
  isFirstItem: PropTypes.bool,
};
