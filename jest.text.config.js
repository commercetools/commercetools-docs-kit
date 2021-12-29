module.exports = {
  runner: 'jest-runner-executor',
  displayName: 'vale',
  moduleFileExtensions: ['md', 'mdx'],
  modulePathIgnorePatterns: [
    'fixtures',
    'CHANGELOG.md',
    'vale-bin',
    'rss-feeds',
  ],
  testMatch: ['**/*.md', '**/*.mdx'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
