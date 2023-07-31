import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

type LordIconProps = {
  iconName: string;
};

const LordIcon = (props: LordIconProps) => {
  const [isClient, setClient] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    setClient(true);

    // Dynamically import the JSON file based on the icon name
    import(`../icons/lord-icon/${props.iconName}.json`)
      .then((data) => {
        setAnimationData(data.default);
      })
      .catch((error) => {
        console.error(`Error loading icon animation: ${error}`);
      });
  }, [props.iconName]);

  useEffect(() => {
    if (!isClient) {
      return <p>SSR</p>;
    }
  }, [isClient, animationData]);
};

export default LordIcon;
