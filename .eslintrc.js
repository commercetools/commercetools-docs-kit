const path = require('path');

module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  settings: {
    'import/extensions': 'off',
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              // https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#reach-router
              // To be removed once reach-router natively supports React 17 and gatsbyJS is not vendoring it any more
              '@reach/router': path.resolve(
                'node_modules/@gatsbyjs/reach-router'
              ),
            },
          },
        },
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/extensions': [
      'error',
      {
        mjs: 'always',
        json: 'always',
        svg: 'always',
        graphql: 'always',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
};
