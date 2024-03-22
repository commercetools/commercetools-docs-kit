import Spreadsheet from '../icons/generated/LordIconMmSpreadsheet';
import Command from '../icons/generated/LordIconMmCommand';
import Unlocked from '../icons/generated/LordIconMmUnlocked';
import Package from '../icons/generated/LordIconMmPackage';
import Login from '../icons/generated/LordIconMmLogin';
import Heartbeat from '../icons/generated/LordIconMmHeartbeat';
import Headset from '../icons/generated/LordIconMmHeadset';
import Handshake from '../icons/generated/LordIconMmHandshake';
import Graduation from '../icons/generated/LordIconMmGraduation';
import Flag from '../icons/generated/LordIconMmFlag';
import Document from '../icons/generated/LordIconMmDocument';
import Api from '../icons/generated/LordIconMmApi';
import Building from '../icons/generated/LordIconMmBuilding';
import Free from '../icons/generated/LordIconMmFree';
import Bookshelf from '../icons/generated/LordIconBookShelf';
import Book from '../icons/generated/LordIconBook';
import ProgrammingBook from '../icons/generated/LordIconProgrammingBook';
import Questionnaire from '../icons/generated/LordIconQuestionnaire';
import Cli from '../icons/generated/LordIconCli';
import Spreadsheet2 from '../icons/generated/LordIconSpreadsheet2';
import UnlockedJson from '../icons/lord-icon/mm-unlocked.json';
import PackageJson from '../icons/lord-icon/mm-package.json';
import LoginJson from '../icons/lord-icon/mm-login.json';
import HeartbeatJson from '../icons/lord-icon/mm-heartbeat.json';
import HeadsetJson from '../icons/lord-icon/mm-headset.json';
import HandshakeJson from '../icons/lord-icon/mm-handshake.json';
import GraduationJson from '../icons/lord-icon/mm-graduation.json';
import FlagJson from '../icons/lord-icon/mm-flag.json';
import DocumentJson from '../icons/lord-icon/mm-document.json';
import ApiJson from '../icons/lord-icon/mm-api.json';
import SpreadsheetJson from '../icons/lord-icon/mm-spreadsheet.json';
import CommandJson from '../icons/lord-icon/mm-command.json';
import BuildingJson from '../icons/lord-icon/mm-building.json';
import FreeJson from '../icons/lord-icon/mm-free.json';
import BookshelfJson from '../icons/lord-icon/book-shelf.json';
import ProgrammingBookJson from '../icons/lord-icon/programming-book.json';
import QuestionnaireJson from '../icons/lord-icon/questionnaire.json';
import BookJson from '../icons/lord-icon/book.json';
import CliJson from '../icons/lord-icon/cli.json';
import Spreadsheet2Json from '../icons/lord-icon/spreadsheet2.json';
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
  building: Building,
  bookshelf: Bookshelf,
  programmingBook: ProgrammingBook,
  questionnaire: Questionnaire,
  book: Book,
  cli: Cli,
  spreadsheet2: Spreadsheet2,
  free: Free,
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
  building: BuildingJson,
  bookshelf: BookshelfJson,
  programmingBook: ProgrammingBookJson,
  questionnaire: QuestionnaireJson,
  book: BookJson,
  cli: CliJson,
  spreadsheet2: Spreadsheet2Json,
  free: FreeJson,
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
