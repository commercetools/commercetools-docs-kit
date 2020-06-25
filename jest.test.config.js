module.exports = {
  displayName: 'test',
  preset: 'jest-preset-gatsby',
  setupFilesAfterEnv: ['./setup-test-framework.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/transform-file.js',
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
};
