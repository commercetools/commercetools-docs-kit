module.exports = {
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaJson: require('./generated/schema.json'),
        tagName: 'graphql',
      },
    ],
  },
  plugins: ['graphql'],
};
