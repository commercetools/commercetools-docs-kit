module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'mjs'],
  modulePathIgnorePatterns: ['.yarn', '.cache', 'dist', 'public'],
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
