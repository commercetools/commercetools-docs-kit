const { customProperties } = require('@commercetools-uikit/design-system');

const defaultOptions = {
  websiteKey: '',
  websitePrimaryColor: customProperties.colorPrimary,
  beta: false,
  gaTrackingId: undefined,
  excludeFromSearchIndex: true,
  createNodeSlug: undefined,
  additionalPrismLanguages: [],
  overrideDefaultConfigurationData: [],
};

module.exports = defaultOptions;
