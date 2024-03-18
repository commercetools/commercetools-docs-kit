import {
  KeyboardEvent,
  MouseEvent,
  ElementType,
  ComponentPropsWithRef,
} from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Inline from '@commercetools-uikit/spacings-inline';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getStateStyles,
  getThemeStyles,
  getSizeStyles,
  getToneStyles,
} from './lord-icon-button-styles';
import LordIcon from './lord-icon';

export type TLordIconButtonProps<
  TStringOrComponent extends ElementType = 'button'
> = {
  /**
   * Used as the HTML type attribute.
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * Should describe what the button does, for accessibility purposes (screen-reader users)
   */
  label: string;
  /**
   * The left icon displayed within the button.
   */
  lordIconKey: string;
  /**
   * If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled
   */
  isToggleButton?: boolean;
  /**
   * Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is `false`.
   */
  isToggled?: boolean;
  /**
   * Tells when the button should present a disabled state.
   */
  isDisabled?: boolean;
  /**
   * Handler when the button is clicked.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Indicates the size of the button.
   */
  size?: 'medium' | 'big';
  /**
   * Indicates the color scheme of the button.
   * @deprecated Use `tone` instead.
   */
  theme?: 'default' | 'info';
  /**
   * Indicates the tone of the button.
   */
  tone?: 'secondary' | 'info';
} & ComponentPropsWithRef<TStringOrComponent>;

const defaultProps: Pick<
  TLordIconButtonProps,
  'type' | 'theme' | 'size' | 'isToggleButton' | 'tone'
> = {
  type: 'button',
  theme: 'default',
  tone: 'secondary',
  size: 'big',
  isToggleButton: false,
};

export const LordIconButton = <
  TStringOrComponent extends ElementType = 'button'
>(
  props: TLordIconButtonProps<TStringOrComponent>
) => {
  const isActive = Boolean(props.isToggleButton && props.isToggled);
  const shouldUseLinkTag = !props.isDisabled && Boolean(props.to);
  const buttonAttributes = {
    'data-track-component': 'LordIconButton',
    ...filterInvalidAttributes(props),
    ...(shouldUseLinkTag ? { to: props.to } : {}),
  };

  const containerStyles = [
    css`
      display: flex;
      align-items: center;
      padding: 0 ${designTokens.spacing30};
      height: ${designTokens.heightForButtonAsBig};
    `,
    css`
      display: inline-flex;
      background-color: ${designTokens.colorSurface};
      border: 1px solid ${designTokens.colorNeutral};
      border-radius: ${designTokens.borderRadiusForButtonAsBig};
      box-shadow: ${designTokens.shadow0};
      color: ${designTokens.colorSolid};
      transition: background-color ${designTokens.transitionLinear80Ms},
        box-shadow ${designTokens.transitionEaseinout150Ms};
    `,
    getThemeStyles(props.theme),
    getStateStyles(props.isDisabled, isActive, props.theme),
    getSizeStyles(props.size),
    getToneStyles(props.tone, props.isDisabled),
  ];

  return (
    <AccessibleButton
      id={props.id}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={containerStyles}
    >
      <Inline alignItems="center" scale="xs">
        {Boolean(props.lordIconKey) && (
          <span
            css={css`
              margin: ${designTokens.spacing05} ${designTokens.spacing05} 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <LordIcon
              iconName={props.lordIconKey}
              height="25"
              width="25"
              trigger="click"
              target={`#${props.id}`}
            />
          </span>
        )}
        <span>{props.label}</span>
      </Inline>
    </AccessibleButton>
  );
};

LordIconButton.displayName = 'LordIconButton';
LordIconButton.defaultProps = defaultProps;

export default LordIconButton;
