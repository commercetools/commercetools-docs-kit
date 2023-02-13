module.exports = {
  displayName: 'test',
  preset: 'jest-preset-gatsby/typescript',
  setupFilesAfterEnv: ['./setup-test-framework.js'],
  modulePathIgnorePatterns: [
    '.cache', // gatsby's temporary generated output
    'gatsby-transformer-mdx-introspection', // disable test of deprecated package
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/transform-file.js',
    // https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#reach-router
    // To be removed once reach-router natively supports React 17 AND gatsbyJS is not vendoring it any more
    '^@reach/router(.*)': '<rootDir>/node_modules/@gatsbyjs/reach-router$1',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },

  /**
   * Setting '__BASE_PATH__' in the globals object fixes problem with
   * this error generated during tests:
   *
   * "ReferenceError: __BASE_PATH__ is not defined"
   *
   * See an opened issue here: https://github.com/gatsbyjs/gatsby/issues/24789
   *
   * This should be removed when this PR is merged or another fix is provided:
   *
   * https://github.com/gatsbyjs/gatsby/pull/24790
   *
   */
  globals: {
    __BASE_PATH__: '',
  },
  testEnvironment: 'jsdom',
};
