module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
