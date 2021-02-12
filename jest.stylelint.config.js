module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['js'],
  modulePathIgnorePatterns: ['dist', 'public', '.spec.js'],
  testMatch: [
    '<rootDir>/packages/gatsby-theme-*/src/**/*.js',
    '<rootDir>/packages/ui-kit/src/**/*.js',
  ],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
