/* eslint-disable global-require */
const path = require('path');

const indexTemplate = (filePaths) => {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = `${basename}SvgIcon`;
    return `export { default as ${exportName} } from './${basename}'`;
  });
  return exportEntries.join('\n');
};

module.exports = {
  icon: false,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
};
