
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export function  configureThemeWithAddOns (themeOptions = {}) {
  const { addOns, ...coreThemeOptions } = themeOptions;
  const addOnPlugins = addOns || [];
  const coreThemeConfig = {
    resolve: pkg.name,
    options: {
      ...coreThemeOptions,
      addOns: addOnPlugins.map((plugin) =>
        typeof plugin === 'string' ? plugin : plugin.resolve
      ),
    },
  };
  // Flatten theme plugins, so that they are loaded by Gatsby as themes
  return [coreThemeConfig, ...addOnPlugins];
}


