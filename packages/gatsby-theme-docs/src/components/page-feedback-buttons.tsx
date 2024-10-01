import styled from '@emotion/styled';
import thumbsUpIcon from '../icons/assistant-thumbs-up.png';
import thumbsDownIcon from '../icons/assistant-thumbs-down.png';
import thumbsUpIconFilled from '../icons/assistant-thumbs-up-filled.png';
import thumbsDownIconFilled from '../icons/assistant-thumbs-down-filled.png';
import { designSystem } from '@commercetools-docs/ui-kit';

type ThumbsButtonProps = {
  isClickable: boolean;
  iconSize: number;
};

export const FEEDBACK_UP = 1;
export const FEEDBACK_DOWN = -1;

const ThumbsButton = styled.button<ThumbsButtonProps>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  background: transparent;
  height: ${(props) => props.iconSize}px;
  width: ${(props) => props.iconSize}px;
  border: 0;
  padding: 3px;
  color: ${designSystem.colors.light.linkHover};
  :focus {
    outline: none;
  }
  img {
    margin-right: 5px;
  }
`;

type ButtonsWrapperProps = {
  hasText: boolean;
};

const ButtonsWrapper = styled.div<ButtonsWrapperProps>`
  display: flex;
  gap: ${(props) => (props.hasText ? '40px' : '0')};
`;

type TPageFeedbackButtonsProps = {
  isPositiveClickable: boolean;
  isNegativeClickable: boolean;
  currentFeedback: number;
  onPositiveClick: () => void;
  onNegativeClick: () => void;
  iconSize?: number;
  positiveText?: string;
  negativeText?: string;
};

const PageFeedbackButtons = (props: TPageFeedbackButtonsProps) => {
  const iconSize = props.iconSize || 28;
  return (
    <ButtonsWrapper hasText={!!(props.positiveText || props.negativeText)}>
      <ThumbsButton
        iconSize={iconSize}
        isClickable={props.isPositiveClickable}
        onClick={
          (props.isPositiveClickable && props.onPositiveClick) || undefined
        }
      >
        <img
          alt="positive feedback"
          src={
            props.currentFeedback === FEEDBACK_UP
              ? thumbsUpIconFilled
              : thumbsUpIcon
          }
          width={iconSize}
        />
        {props.positiveText && <span>{props.positiveText}</span>}
      </ThumbsButton>
      <ThumbsButton
        iconSize={iconSize}
        isClickable={props.isNegativeClickable}
        onClick={
          (props.isNegativeClickable && props.onNegativeClick) || undefined
        }
      >
        <img
          alt="negative feedback"
          src={
            props.currentFeedback === FEEDBACK_DOWN
              ? thumbsDownIconFilled
              : thumbsDownIcon
          }
          width={iconSize}
        />
        {props.negativeText && <span>{props.negativeText}</span>}
      </ThumbsButton>
    </ButtonsWrapper>
  );
};

export default PageFeedbackButtons;
