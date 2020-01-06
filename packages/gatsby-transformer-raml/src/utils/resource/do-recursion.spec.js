const doRecursion = require('./do-recursion');

describe('transforms built in types for custom use case', () => {
  it('should return number for integer built in type', () => {
    const resourceBefore = {
      '(resourceName)': 'ByProjectKey',
      '(resourcePathUri)': '/{projectKey}',

      uriParameters: {
        projectKey: {
          type: 'string',
          '(builtinType)': 'string',
          description: 'The CTP project key.',
        },
      },
    };

    const resourceAfter = {
      resourceName: 'ByProjectKey',
      resourcePathUri: '/{projectKey}',

      uriParameters: {
        projectKey: {
          type: 'string',
          builtinType: 'string',
          description: 'The CTP project key.',
        },
      },
    };

    expect(doRecursion(resourceBefore)).toEqual(resourceAfter);
  });
});
