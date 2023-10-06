import Spreadsheet from '../icons/generated/LordIconSpreadsheet';
import Command from '../icons/generated/LordIconCommand';
import Unlocked from '../icons/generated/LordIconUnlocked';
import Package from '../icons/generated/LordIconPackage';
import Login from '../icons/generated/LordIconLogin';
import Heartbeat from '../icons/generated/LordIconHeartbeat';
import Headset from '../icons/generated/LordIconHeadset';
import Handshake from '../icons/generated/LordIconHandshake';
import Graduation from '../icons/generated/LordIconGraduation';
import Flag from '../icons/generated/LordIconFlag';
import Document from '../icons/generated/LordIconDocument';
import Api from '../icons/generated/LordIconApi';
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
import SpreadsheetJson from '../icons/lord-icon/spreadsheet.json';
import CommandJson from '../icons/lord-icon/command.json';
import { IconData } from 'lord-icon-element/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconNameToSvgMap: Record<string, any> = {
  spreadsheet: Spreadsheet,
  command: Command,
  unlocked: Unlocked,
  package: Package,
  login: Login,
  heartbeat: Heartbeat,
  headset: Headset,
  handshake: Handshake,
  graduation: Graduation,
  flag: Flag,
  document: Document,
  api: Api,
};

const iconNameToLottieJSON: Record<string, object> = {
  spreadsheet: SpreadsheetJson,
  command: CommandJson,
  unlocked: UnlockedJson,
  package: PackageJson,
  login: LoginJson,
  heartbeat: HeartbeatJson,
  headset: HeadsetJson,
  handshake: HandshakeJson,
  graduation: GraduationJson,
  flag: FlagJson,
  document: DocumentJson,
  api: ApiJson,
};

export const getStaticSvgComponent = (iconName: string) => {
  return iconNameToSvgMap[iconName];
};

export const getLottieJsonConfig = (iconName: string) => {
  return iconNameToLottieJSON[iconName];
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
