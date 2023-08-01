import Suitcase from '../icons/generated/Suitcase';

export const getStaticSvgComponent = (iconName: string) => {
  switch (iconName) {
    case 'suitcase':
      return Suitcase;
    default:
      return Suitcase;
  }
};
