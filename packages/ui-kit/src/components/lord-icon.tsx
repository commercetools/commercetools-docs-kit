import React, { useEffect, useState } from 'react';
import { getStaticSvgComponent } from '../utils/lord-icon';
import styled from '@emotion/styled';

const LordIconLazy = React.lazy(() => import('./lord-icon-client-side'));

export type LordIconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'boomerang'
  | 'sequence';

type LordIconProps = {
  iconName: string;
  delay?: number;
  height?: string;
  width?: string;
  stroke?: number;
  target?: string;
  trigger?: LordIconTrigger;
};

type LordIconWrapperProps = {
  height?: string;
  width?: string;
};

const LordIconWrapper = styled.div<LordIconWrapperProps>`
  display: inline-block;

  & :first-child {
    height: ${(props) => props.height}px !important;
    width: ${(props) => props.width}px !important;
  }
`;

const LordIcon = (props: LordIconProps) => {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const StaticSvgComponent = getStaticSvgComponent(props.iconName);

  return (
    <LordIconWrapper height={props.height} width={props.width}>
      {isClient ? (
        <React.Suspense
          fallback={StaticSvgComponent ? <StaticSvgComponent /> : null}
        >
          <LordIconLazy {...props} />
        </React.Suspense>
      ) : StaticSvgComponent ? (
        <StaticSvgComponent />
      ) : null}
    </LordIconWrapper>
  );
};

export default LordIcon;
