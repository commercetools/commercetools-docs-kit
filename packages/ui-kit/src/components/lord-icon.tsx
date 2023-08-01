import React, { useEffect, useState } from 'react';
import { getStaticSvgComponent } from '../utils/lord-icon';

const LordIconLazy = React.lazy(() => import('./lord-icon-client-side'));

type LordIconProps = {
  iconName: string;
  loop: boolean;
  autoplay: boolean;
  style: object;
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
        <React.Suspense fallback={<StaticSvgComponent />}>
          <LordIconLazy {...props} />
        </React.Suspense>
      ) : (
        <StaticSvgComponent />
      )}
    </>
  );
};

export default LordIcon;
