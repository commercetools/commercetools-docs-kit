const fs = require('fs');
const path = require('path');
const defaultOptions = require('./default-options');

const markdownComponentFileName = 'markdown-components.js';
const addOnsFolderPath = 'src/@commercetools-docs/gatsby-theme-docs/overrides';
const markdownComponentsPath = path.join(
  addOnsFolderPath,
  markdownComponentFileName
);
const gitignorePath = path.join(addOnsFolderPath, '.gitignore');

function bootstrapThemeAddOnsForMarkdownComponents(themeAddOnNames) {
  let markdownComponents = `/* THIS IS AN AUTOGENERATED FILE, DO NOT EDIT DIRECTLY */\n`;
  themeAddOnNames.forEach((plugin, index) => {
    markdownComponents += `import * as components${index} from '${plugin}';`;
  });
  markdownComponents += `\n
export default {
${themeAddOnNames.map((_, index) => `...components${index},`).join('\n')}
}
  `;
  if (!fs.existsSync(addOnsFolderPath)) {
    fs.mkdirSync('src/@commercetools-docs');
    fs.mkdirSync('src/@commercetools-docs/gatsby-theme-docs');
    fs.mkdirSync('src/@commercetools-docs/gatsby-theme-docs/overrides');
  }
  fs.writeFileSync(markdownComponentsPath, markdownComponents, 'utf-8');
  fs.writeFileSync(gitignorePath, markdownComponentFileName, 'utf-8');
}

function bootstrapThemeAddOns({ reporter }, themeOptions) {
  const pluginOptions = { ...defaultOptions, ...themeOptions };
  const themeAddOnNames = pluginOptions.addOns.reduce(
    (allAddOnNames, pluginName) => {
      if (pluginName.startsWith('@commercetools-docs/gatsby-theme')) {
        return [...allAddOnNames, pluginName];
      }
      return allAddOnNames;
    },
    []
  );

  if (themeAddOnNames.length > 0) {
    reporter.info(`bootstrapping theme add-ons ${themeAddOnNames.toString()}`);
    bootstrapThemeAddOnsForMarkdownComponents(themeAddOnNames);
  }
}

module.exports = bootstrapThemeAddOns;
