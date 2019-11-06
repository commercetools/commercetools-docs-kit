module.exports = {
  displayName: 'Test',
  preset: 'jest-preset-gatsby',
  setupFilesAfterEnv: ['./setup-test-framework.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/transform-file.js',
  },
};
