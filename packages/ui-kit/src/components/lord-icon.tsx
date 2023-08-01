import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

type LordIconProps = {
  iconName: string;
  loop: boolean;
  autoplay: boolean;
  stype: object;
};

const LordIcon = (props: LordIconProps) => {
  const [isClient, setClient] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const { iconName, ...rest } = props;

  useEffect(() => {
    setClient(true);

    const loadAnimationData = async () => {
      console.log('loading');
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

  if (!isClient) {
    // If SSR, return the static SVG
    return <p>SSR</p>;
  }
  // if (!animationData) {
  //   // If the animation data is not loaded yet, you can display a loading state or a fallback.
  //   return <div>Loading...</div>;
  // }

  return <Lottie animationData={animationData} {...rest} />;
};

export default LordIcon;
