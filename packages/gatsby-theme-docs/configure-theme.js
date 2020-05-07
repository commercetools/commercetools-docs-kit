const pkg = require('./package.json');

function configureThemeWithAddOns(themeOptions = {}) {
  const { addOnPlugins, ...coreThemeOptions } = themeOptions;

  if (!addOnPlugins || !Array.isArray(addOnPlugins)) {
    throw new Error(
      'Missing or wrong format for "addOnPlugins" option. Expected a list of Gatsby theme add-on plugins.'
    );
  }

  const coreThemeConfig = {
    resolve: pkg.name,
    options: {
      ...coreThemeOptions,
      themeAddOns: addOnPlugins.map((plugin) =>
        typeof plugin === 'string' ? plugin : plugin.resolve
      ),
    },
  };
  // Flatten theme plugins, so that they are loaded by Gatsby as themes
  return [coreThemeConfig, ...addOnPlugins];
}

exports.configureThemeWithAddOns = configureThemeWithAddOns;
