// should track https://github.com/commercetools/ui-kit/blob/main/babel.config.js as suitable
module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-mc-app',
      {
        // TODO: change this to `automatic` when using the new runtime
        runtime: 'classic',
        keepPropTypes: true,
      },
    ],
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: ['babel-plugin-typescript-to-proptypes'],
};
