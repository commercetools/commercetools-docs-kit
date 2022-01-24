import invariant from 'tiny-invariant';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../design-system';
import React from 'react';

type IconSize = 'small' | 'medium' | 'big' | 'scale';
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
};

const getSizeStyle = (size: IconSize) => {
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: 100%;
          height: auto;
        }
      `;
    case 'small':
    case 'medium':
    case 'big':
      return `
        width: ${iconSizes[size]}px;
        height: ${iconSizes[size]}px;
      `;
    default:
      return `
        width: ${iconSizes.big}px;
        height: ${iconSizes.big}px;
      `;
  }
};

const getColor = (color: keyof typeof colors.light) => {
  if (!color) return 'inherit';

  const iconColor = colors.light[color];

  if (!iconColor) {
    invariant(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

export default function createStyledIcon(Component: React.ComponentClass) {
  const StyledComponent = styled(Component)(
    (props: StyledComponentProps) => css`
      *:not([fill='none']) {
        fill: ${getColor(props.color)};
      }
      ${getSizeStyle(props.size)}
    `
  );
  type StyledComponentProps = {
    color: keyof typeof colors.light;
    size: IconSize;
  };

  return StyledComponent;
}
