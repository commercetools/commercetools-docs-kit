import React from 'react';

type LoadingType = 'lazy' | 'interaction';

type LordIconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'boomerang'
  | 'sequence';

type LordIconProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  src?: string;
  trigger?: LordIconTrigger;
  colors?: string;
  loading?: LoadingType;
  delay?: string | number;
  target?: string;
  stroke?: number;
};

type LordIconElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  LordIconProps;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': LordIconElement;
    }
  }
}
