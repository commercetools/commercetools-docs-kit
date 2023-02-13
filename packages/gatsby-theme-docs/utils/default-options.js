const colorPresets = require('../color-presets');

const defaultOptions = {
  websiteKey: '',
  colorPreset: colorPresets.base.key,
  gaTrackingIds: undefined,
  createNodeSlug: undefined,
  additionalPrismLanguages: [],
  overrideDefaultConfigurationData: [],
  addOns: [],
  enableCanonicalUrls: true,
};

module.exports = defaultOptions;
