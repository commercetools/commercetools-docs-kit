import * as apiDeveloperDocs from './api-developer-docs/index.mjs';
import * as base from './base/index.mjs';
import * as merchantCenterDeveloperDocs from './merchant-center-developer-docs/index.mjs';
import * as merchantCenterUserDocs from './merchant-center-user-docs/index.mjs';
import * as platformDeveloperDocs from './platform-developer-docs/index.mjs';
import * as optionOne from './option-1/index.mjs';
import * as optionTwo from './option-2/index.mjs';
import * as optionThree from './option-3/index.mjs';

const colorPresets = {
  apiDeveloperDocs: {
    key: 'apiDeveloperDocs',
    relativePath: 'api-developer-docs',
    value: apiDeveloperDocs,
  },
  base: {
    key: 'base',
    relativePath: 'base',
    value: base,
  },
  merchantCenterDeveloperDocs: {
    key: 'merchantCenterDeveloperDocs',
    relativePath: 'merchant-center-developer-docs',
    value: merchantCenterDeveloperDocs,
  },
  merchantCenterUserDocs: {
    key: 'merchantCenterUserDocs',
    relativePath: 'merchant-center-user-docs',
    value: merchantCenterUserDocs,
  },
  platformDeveloperDocs: {
    key: 'platformDeveloperDocs',
    relativePath: 'platform-developer-docs',
    value: platformDeveloperDocs,
  },
  optionOne: {
    key: 'optionOne',
    relativePath: 'option-1',
    value: optionOne,
  },
  optionTwo: {
    key: 'optionTwo',
    relativePath: 'option-2',
    value: optionTwo,
  },
  optionThree: {
    key: 'optionThree',
    relativePath: 'option-3',
    value: optionThree,
  },
};
export default colorPresets;
