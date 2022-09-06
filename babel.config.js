// should track https://github.com/commercetools/ui-kit/blob/main/babel.config.js as suitable
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
  plugins: ['babel-plugin-typescript-to-proptypes', '@babel/plugin-syntax-jsx'],
};
