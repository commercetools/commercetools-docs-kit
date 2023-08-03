import Suitcase from '../icons/generated/Suitcase';
import SuitcaseJson from '../icons/lord-icon/suitcase.json';

export const getStaticSvgComponent = (iconName: string) => {
  switch (iconName) {
    case 'suitcase':
      return Suitcase;
    default:
      return Suitcase;
  }
};

export const getLottieJsonConfig = (iconName: string) => {
  switch (iconName) {
    case 'suitcase':
      return SuitcaseJson;
    default:
      return undefined;
  }
};
