// modules to be transpiled by Jest (using babel) as they come as ESM
const esmModules = [
  'comma-separated-tokens',
  'decode-named-character-reference',
  'fault',
  'hast-util-whitespace',
  'mdast-util-definitions',
  'mdast-util-from-markdown',
  'mdast-util-frontmatter',
  'mdast-util-to-string',
  'micromark',
  'rehype-react',
  'remark-frontmatter',
  'remark-parse',
  'remark-rehype',
  'space-separated-tokens',
  'trim-lines',
  'unified',
  'unist-util-filter',
  'unist-util-generated',
  'unist-util-is',
  'unist-util-position',
  'unist-util-stringify-position',
  'unist-util-visit',
  'vfile-message',
  '@react-hook',
];

module.exports = {
  displayName: 'test',
  preset: 'jest-preset-gatsby/typescript',
  setupFilesAfterEnv: ['./setup-test-framework.js'],
  modulePathIgnorePatterns: [
    '.cache', // gatsby's temporary generated output
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/transform-file.js',
    // https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#reach-router
    // To be removed once reach-router natively supports React 17 and gatsbyJS is not vendoring it any more
    '^@reach/router(.*)': '<rootDir>/node_modules/@gatsbyjs/reach-router$1',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    `<rootDir>/node_modules/(?!(${esmModules.join('|')})).+\\.js$`,
  ],

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
