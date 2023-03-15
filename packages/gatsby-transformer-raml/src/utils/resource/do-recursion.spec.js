import doRecursion from './do-recursion.mjs';

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

      post: {
        securedBy: [
          {
            oauth_2_0: {
              scopes: ['manage_test:{projectKey}'],
            },
          },
        ],
        displayName: 'Update a Resource by ID',
        body: {
          'application/json': {
            type: 'ExampleResourceUpdate',
            builtinType: 'object',
          },
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

      post: {
        securedBy: [
          {
            oauth_2_0: {
              scopes: ['manage_test:{projectKey}'],
            },
          },
        ],
        displayName: 'Update a Resource by ID',
        body: {
          applicationjson: {
            type: 'ExampleResourceUpdate',
            builtinType: 'object',
          },
        },
      },
    };

    expect(doRecursion(resourceBefore)).toEqual(resourceAfter);
  });
});
