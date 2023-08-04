import Suitcase from '../icons/generated/Suitcase';
import Command from '../icons/generated/Command';
import SuitcaseJson from '../icons/lord-icon/suitcase.json';
import CommandJson from '../icons/lord-icon/command.json';
import { IconData } from 'lord-icon-element/interfaces';

export const getStaticSvgComponent = (iconName: string) => {
  switch (iconName) {
    case 'suitcase':
      return Suitcase;
    case 'command':
      return Command;
    default:
      return undefined;
  }
};

export const getLottieJsonConfig = (iconName: string) => {
  switch (iconName) {
    case 'suitcase':
      return SuitcaseJson;
    case 'command':
      return CommandJson;
    default:
      return undefined;
  }
};

export const iconLoader = async (iconName: string): Promise<IconData> => {
  const data = getLottieJsonConfig(iconName);
  if (data) {
    // icon config availabe in the build
    return data;
  } else {
    try {
      const data = await import(
        `@commercetools-docs/ui-kit/dist/icons/lord-icon/${iconName}.json`
      );
      return data.default;
    } catch (error) {
      console.error(`Error loading icon animation: ${error}`);
    }
  }
};
