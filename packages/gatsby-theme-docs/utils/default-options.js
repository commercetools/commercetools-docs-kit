const { customProperties } = require('@commercetools-uikit/design-system');

const defaultOptions = {
  websiteKey: '',
  websitePrimaryColor: customProperties.colorSolid,
  beta: false,
  gaTrackingId: undefined,
  excludeFromSearchIndex: true,
  createNodeSlug: undefined,
  additionalPrismLanguages: [],
  overrideDefaultConfigurationData: [],
  themeAddOns: [],
};

module.exports = defaultOptions;
