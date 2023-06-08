/* eslint-disable global-require */
const nodePath = require('path');

const indexTemplate = (fileInfo) => {
  const exportEntries = fileInfo.map(({ path }) => {
    const basename = nodePath.basename(path, nodePath.extname(path));
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
      'prefixIds',
    ],
  },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
};
