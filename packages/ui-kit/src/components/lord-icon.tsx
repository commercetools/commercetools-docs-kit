import React, { useEffect, useState } from 'react';
import { getStaticSvgComponent } from '../utils/lord-icon';

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

const LordIcon = (props: LordIconProps) => {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const StaticSvgComponent = getStaticSvgComponent(props.iconName);

  return (
    <>
      {isClient ? (
        <React.Suspense
          fallback={StaticSvgComponent ? <StaticSvgComponent /> : null}
        >
          <LordIconLazy {...props} />
        </React.Suspense>
      ) : StaticSvgComponent ? (
        <StaticSvgComponent height={props.height} width={props.width} />
      ) : null}
    </>
  );
};

export default LordIcon;
