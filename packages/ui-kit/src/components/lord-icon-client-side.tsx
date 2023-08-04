import React from 'react';
import lottie from 'lottie-web';
import { getStaticSvgComponent, iconLoader } from '../utils/lord-icon';
import { defineElement } from 'lord-icon-element';
import { Element } from 'lord-icon-element/element';
import { LordIconTrigger } from './lord-icon';

Element.setIconLoader(iconLoader);

defineElement(lottie.loadAnimation);

type LordIconProps = {
  iconName: string;
  delay?: number;
  height?: string;
  width?: string;
  stroke?: number;
  target?: string;
  trigger?: LordIconTrigger;
};

const LordIcon = (props: LordIconProps) => {
  const { iconName, trigger, delay, target, stroke, height, width, ...rest } =
    props;
  const StaticSvgComponent = getStaticSvgComponent(iconName);

  return (
    <lord-icon
      icon={iconName}
      trigger={trigger}
      delay={delay}
      target={target}
      stroke={stroke}
      {...rest}
    >
      {StaticSvgComponent && <StaticSvgComponent />}
    </lord-icon>
  );
};

export default LordIcon;
