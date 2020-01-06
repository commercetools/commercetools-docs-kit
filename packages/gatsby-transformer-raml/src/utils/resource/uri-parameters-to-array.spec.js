const uriParametersToArray = require('./uri-parameters-to-array');

it('should return number for integer built in type', () => {
  const uriParametersBefore = {
    projectKey: {
      type: 'string',
      builtinType: 'string',
      description: 'The CTP project key.',
    },

    key: {
      type: 'string',
      builtinType: 'string',
    },
  };

  const uriParametersAfter = [
    {
      name: 'projectKey',
      type: 'string',
      builtinType: 'string',
      description: 'The CTP project key.',
    },
    {
      name: 'key',
      type: 'string',
      builtinType: 'string',
    },
  ];

  expect(uriParametersToArray(uriParametersBefore)).toEqual(uriParametersAfter);
});
