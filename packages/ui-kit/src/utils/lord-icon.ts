import Suitcase from '../icons/generated/Suitcase';
import Command from '../icons/generated/Command';
import Unlocked from '../icons/generated/Unlocked';
import Package from '../icons/generated/Package';
import Login from '../icons/generated/Login';
import Heartbeat from '../icons/generated/Heartbeat';
import Headset from '../icons/generated/Headset';
import Handshake from '../icons/generated/Handshake';
import Graduation from '../icons/generated/Graduation';
import Flag from '../icons/generated/Flag';
import Document from '../icons/generated/Document';
import Api from '../icons/generated/Api';
import UnlockedJson from '../icons/lord-icon/unlocked.json';
import PackageJson from '../icons/lord-icon/package.json';
import LoginJson from '../icons/lord-icon/login.json';
import HeartbeatJson from '../icons/lord-icon/heartbeat.json';
import HeadsetJson from '../icons/lord-icon/headset.json';
import HandshakeJson from '../icons/lord-icon/handshake.json';
import GraduationJson from '../icons/lord-icon/graduation.json';
import FlagJson from '../icons/lord-icon/flag.json';
import DocumentJson from '../icons/lord-icon/document.json';
import ApiJson from '../icons/lord-icon/api.json';
import SuitcaseJson from '../icons/lord-icon/suitcase.json';
import CommandJson from '../icons/lord-icon/command.json';
import { IconData } from 'lord-icon-element/interfaces';

export const getStaticSvgComponent = (iconName: string) => {
  switch (iconName) {
    case 'suitcase':
      return Suitcase;
    case 'command':
      return Command;
    case 'unlocked':
      return Unlocked;
    case 'package':
      return Package;
    case 'login':
      return Login;
    case 'heartbeat':
      return Heartbeat;
    case 'headset':
      return Headset;
    case 'handshake':
      return Handshake;
    case 'graduation':
      return Graduation;
    case 'flag':
      return Flag;
    case 'document':
      return Document;
    case 'api':
      return Api;
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
    case 'unlocked':
      return UnlockedJson;
    case 'package':
      return PackageJson;
    case 'login':
      return LoginJson;
    case 'heartbeat':
      return HeartbeatJson;
    case 'headset':
      return HeadsetJson;
    case 'handshake':
      return HandshakeJson;
    case 'graduation':
      return GraduationJson;
    case 'flag':
      return FlagJson;
    case 'document':
      return DocumentJson;
    case 'api':
      return ApiJson;
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
