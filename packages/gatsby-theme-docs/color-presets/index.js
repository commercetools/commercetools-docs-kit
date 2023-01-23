/* eslint-disable global-require */

module.exports = {
  apiDeveloperDocs: {
    key: 'apiDeveloperDocs',
    relativePath: 'api-developer-docs',
    value: require('./api-developer-docs'),
  },
  base: {
    key: 'base',
    relativePath: 'base',
    value: require('./base'),
  },
  merchantCenterDeveloperDocs: {
    key: 'merchantCenterDeveloperDocs',
    relativePath: 'merchant-center-developer-docs',
    value: require('./merchant-center-developer-docs'),
  },
  merchantCenterUserDocs: {
    key: 'merchantCenterUserDocs',
    relativePath: 'merchant-center-user-docs',
    value: require('./merchant-center-user-docs'),
  },
  platformDeveloperDocs: {
    key: 'platformDeveloperDocs',
    relativePath: 'platform-developer-docs',
    value: require('./platform-developer-docs'),
  },
  termsDocs: {
    key: 'termsDocs',
    relativePath: 'terms-docs',
    value: require('./terms-docs'),
  },
};
