const colorPresets = require('../color-presets');

const defaultOptions = {
  websiteKey: '',
  colorPreset: colorPresets.base.key,
  beta: false,
  gaTrackingId: undefined,
  allowWideContentLayout: false,
  createNodeSlug: undefined,
  additionalPrismLanguages: [],
  overrideDefaultConfigurationData: [],
  addOns: [],
  enableCanonicalUrls: true,
};

module.exports = defaultOptions;
