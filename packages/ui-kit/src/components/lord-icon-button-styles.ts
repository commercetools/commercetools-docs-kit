import type { Theme } from '@emotion/react';

import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TLordIconButtonProps } from './lord-icon-button';

const getStateStyles = (
  isDisabled: boolean,
  isActive: boolean,
  theme: Theme
) => {
  if (isDisabled) {
    return css`
      box-shadow: ${designTokens.shadowForButtonWhenDisabled};
      background-color: ${designTokens.backgroundColorForButtonWhenDisabled};
      border: none;
      color: ${designTokens.colorNeutral60};
      &:focus,
      &:hover {
        color: ${designTokens.colorNeutral60};

        * {
          fill: ${designTokens.colorNeutral60};
        }
      }
    `;
  }
  if (isActive) {
    const baseActiveStyles = [
      css`
        border: 1px solid ${designTokens.borderColorForInputWhenFocused};
        box-shadow: ${designTokens.shadowForButtonWhenActive};
        background-color: ${designTokens.colorSurface};
        &:focus,
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonWhenActive};
        }
      `,
    ];
    switch (theme) {
      case 'info':
        return [
          baseActiveStyles,
          css`
            color: ${designTokens.colorInfo};
          `,
        ];
      default:
        return baseActiveStyles;
    }
  }
  return css`
    &:focus,
    &:hover {
      border: ${designTokens.borderForButtonAsSecondaryWhenHovered};
      box-shadow: ${designTokens.shadowForButtonWhenFocused};
    }
    &:hover {
      background-color: ${designTokens.backgroundColorForButtonWhenHovered};
    }
    &:active {
      border: ${designTokens.borderForButtonAsSecondaryWhenActive};
      box-shadow: ${designTokens.shadowForButtonWhenActive};
      background-color: ${designTokens.backgroundColorForButtonWhenActive};
    }
  `;
};

const getThemeStyles = (theme: Theme) => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'info':
      return css`
        &:focus,
        &:hover {
          color: ${designTokens.colorInfo};

          * {
            fill: ${designTokens.colorInfo};
          }
        }
      `;
    default: {
      return css`
        &:focus,
        &:hover {
          box-shadow: ${designTokens.shadowForButtonWhenFocused};
          background-color: ${designTokens.backgroundColorForButtonWhenHovered};
        }
        &:active {
          box-shadow: ${designTokens.shadowForButtonWhenActive};
          background-color: ${designTokens.backgroundColorForButtonWhenActive};
        }
      `;
    }
  }
};

const getSizeStyles = (size: TLordIconButtonProps['size']) => {
  switch (size) {
    case 'medium':
      return css`
        height: ${designTokens.heightForButtonAsMedium};
        border-radius: ${designTokens.borderRadiusForButtonAsMedium};
        padding: ${designTokens.paddingForButtonAsMedium};
      `;

    case 'big':
      return css`
        height: ${designTokens.heightForButtonAsBig};
        border-radius: ${designTokens.borderRadiusForButtonAsBig};
        padding: ${designTokens.paddingForButtonAsBig};
      `;

    default:
      return css``;
  }
};

const getToneStyles = (
  tone: TLordIconButtonProps['tone'],
  isDisabled: boolean
) => {
  switch (tone) {
    case 'info':
      return [
        !isDisabled &&
          css`
            background-color: ${designTokens.backgroundColorForButtonAsSecondaryWhenInfo};
            border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            &:hover {
              background-color: ${designTokens.backgroundColorForButtonAsSecondaryWhenInfoAndHovered};
              border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            }
            &:focus {
              border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            }
            &:active {
              background-color: ${designTokens.backgroundColorForButtonAsSecondaryWhenInfoAndActive};
              border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            }
          `,
      ];

    default:
      return css``;
  }
};

export { getStateStyles, getThemeStyles, getSizeStyles, getToneStyles };
