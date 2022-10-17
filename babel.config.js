/**
 * NOTE: reference config from https://github.com/commercetools/merchant-center-application-kit/blob/main/babel.config.js
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-mc-app',
      {
        runtime: 'automatic',
        keepPropTypes: true,
      },
    ],
  ],
  plugins: ['babel-plugin-typescript-to-proptypes'],
};
