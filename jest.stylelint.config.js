module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['js'],
  modulePathIgnorePatterns: ['dist', 'public', '.spec.js'],
  testMatch: ['<rootDir>/packages/**/src/**/*.js'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
