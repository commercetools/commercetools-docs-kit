module.exports = {
  runner: 'jest-runner-executor',
  displayName: 'vale',
  moduleFileExtensions: ['md', 'mdx'],
  modulePathIgnorePatterns: ['fixtures', 'CHANGELOG.md'],
  testMatch: ['**/*.md', '**/*.mdx'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
