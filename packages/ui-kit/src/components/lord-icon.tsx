import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { getStaticSvgComponent } from '../utils/lord-icon';

type LordIconProps = {
  iconName: string;
  loop: boolean;
  autoplay: boolean;
  style: object;
};

const defaultProps = {
  loop: false,
  autoplay: false,
};

const LordIcon = (props: LordIconProps) => {
  const [isClient, setClient] = useState(false);
  const [animationData, setAnimationData] = useState();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { iconName, ...rest } = props;

  useEffect(() => {
    setClient(true);

    const loadAnimationData = async () => {
      try {
        const data = await import(
          `@commercetools-docs/ui-kit/dist/icons/lord-icon/${iconName}.json`
        );
        setAnimationData(data.default);
      } catch (error) {
        console.error(`Error loading icon animation: ${error}`);
      }
    };
    loadAnimationData();
  }, [iconName]);

  if (!isClient || !animationData) {
    const StaticSvgComponent = getStaticSvgComponent(props.iconName);
    return StaticSvgComponent ? <StaticSvgComponent /> : null;
  }

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  return (
    <Lottie
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      lottieRef={lottieRef}
      animationData={animationData}
      {...defaultProps}
      {...rest}
    />
  );
};

export default LordIcon;
