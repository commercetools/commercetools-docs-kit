import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { getLottieJsonConfig } from '../utils/lord-icon';

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
  const [animationData, setAnimationData] = useState<object>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { iconName, ...rest } = props;

  useEffect(() => {
    const loadAnimationData = async () => {
      const data = getLottieJsonConfig(iconName);
      if (data) {
        // icon config availabe in the build
        setAnimationData(data);
      } else {
        try {
          const data = await import(
            `@commercetools-docs/ui-kit/dist/icons/lord-icon/${iconName}.json`
          );
          setAnimationData(data.default);
        } catch (error) {
          console.error(`Error loading icon animation: ${error}`);
        }
      }
    };
    loadAnimationData();
  }, [iconName]);

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
