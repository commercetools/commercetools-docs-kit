const colorPresets = require('../color-presets');

const defaultOptions = {
  websiteKey: '',
  colorPreset: colorPresets.base.key,
  beta: false,
  gaTrackingId: undefined,
  excludeFromSearchIndex: true,
  allowWideContentLayout: false,
  createNodeSlug: undefined,
  additionalPrismLanguages: [],
  overrideDefaultConfigurationData: [],
  addOns: [],
};

module.exports = defaultOptions;
