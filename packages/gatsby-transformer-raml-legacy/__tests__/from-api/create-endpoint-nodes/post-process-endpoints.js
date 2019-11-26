const {
  flattenResources,
  processMethods,
  processMethodResponses,
  isValidBody,
  mutateKeyToMimeType,
} = require('../../../src/from-api/create-endpoints-nodes/post-process-endpoints');

describe('PostProcessor', () => {
  it('flattenResources', () => {
    const arrayBefore1 = [
      {
        absoluteUri: 'https://import.commercetools.com/{projectKey}',
        resources: [
          {
            absoluteUri:
              'https://import.commercetools.com/{projectKey}/import-sinks',
            resources: [
              {
                absoluteUri:
                  'https://import.commercetools.com/{projectKey}/import-sinks/{key}',
                resources: [
                  {
                    absoluteUri:
                      'https://import.commercetools.com/{projectKey}/import-sinks/{key}/requests',
                  },
                  {
                    absoluteUri:
                      'https://import.commercetools.com/{projectKey}/import-sinks/{key}/items',
                    resources: [
                      {
                        absoluteUri:
                          'https://import.commercetools.com/{projectKey}/import-sinks/{key}/items/{resourceKey}',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const arrayAfter1 = [
      {
        apiKey: 'import',
        absoluteUri: 'https://import.commercetools.com/{projectKey}',
      },
      {
        apiKey: 'import',
        absoluteUri:
          'https://import.commercetools.com/{projectKey}/import-sinks',
      },
      {
        apiKey: 'import',
        absoluteUri:
          'https://import.commercetools.com/{projectKey}/import-sinks/{key}',
      },
      {
        apiKey: 'import',
        absoluteUri:
          'https://import.commercetools.com/{projectKey}/import-sinks/{key}/requests',
      },
      {
        apiKey: 'import',
        absoluteUri:
          'https://import.commercetools.com/{projectKey}/import-sinks/{key}/items',
      },
      {
        apiKey: 'import',
        absoluteUri:
          'https://import.commercetools.com/{projectKey}/import-sinks/{key}/items/{resourceKey}',
      },
    ];

    Object.freeze(arrayBefore1);

    expect(flattenResources('import', arrayBefore1)).toEqual(arrayAfter1);

    const arrayBefore2 = [
      {
        absoluteUri: 'http://import-storage/{projectKey}',
        resources: [
          {
            absoluteUri: 'http://import-storage/{projectKey}/import-sinks',
            resources: [
              {
                absoluteUri:
                  'http://import-storage/{projectKey}/import-sinks/{importSinkKey}',
              },
            ],
          },
          {
            absoluteUri:
              'http://import-storage/{projectKey}/unresolved-import-resource',
            resources: [
              {
                absoluteUri:
                  'http://import-storage/{projectKey}/unresolved-import-resource/search',
                resources: [
                  {
                    absoluteUri:
                      'http://import-storage/{projectKey}/unresolved-import-resource/search/{resourceType}',
                    resources: [
                      {
                        absoluteUri:
                          'http://import-storage/{projectKey}/unresolved-import-resource/search/{resourceType}/{key}',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const arrayAfter2 = [
      {
        apiKey: 'import-storage-api',
        absoluteUri: 'http://import-storage/{projectKey}',
      },
      {
        apiKey: 'import-storage-api',
        absoluteUri: 'http://import-storage/{projectKey}/import-sinks',
      },
      {
        apiKey: 'import-storage-api',
        absoluteUri:
          'http://import-storage/{projectKey}/import-sinks/{importSinkKey}',
      },
      {
        apiKey: 'import-storage-api',
        absoluteUri:
          'http://import-storage/{projectKey}/unresolved-import-resource',
      },
      {
        apiKey: 'import-storage-api',
        absoluteUri:
          'http://import-storage/{projectKey}/unresolved-import-resource/search',
      },
      {
        apiKey: 'import-storage-api',
        absoluteUri:
          'http://import-storage/{projectKey}/unresolved-import-resource/search/{resourceType}',
      },
      {
        apiKey: 'import-storage-api',
        absoluteUri:
          'http://import-storage/{projectKey}/unresolved-import-resource/search/{resourceType}/{key}',
      },
    ];

    Object.freeze(arrayBefore2);

    expect(flattenResources('import-storage-api', arrayBefore2)).toEqual(
      arrayAfter2
    );
  });

  it('processMethods', () => {
    const arrayBefore = [
      {
        method: 'post',
        responses: [
          {
            body: [
              {
                key: 'application/json',
                name: 'ImportSink',
              },
            ],
          },
          {
            body: [
              {
                key: 'application/json',
                name: 'ErrorResponse',
              },
            ],
          },
        ],
      },
    ];
    const arrayAfter = [
      {
        method: 'post',
        responses: [
          {
            body: [
              {
                mimeType: 'application/json',
                name: 'ImportSink',
              },
            ],
          },
          {
            body: [
              {
                mimeType: 'application/json',
                name: 'ErrorResponse',
              },
            ],
          },
        ],
      },
    ];

    Object.freeze(arrayBefore);

    expect(processMethods(arrayBefore)).toEqual(arrayAfter);
  });

  it('isValidBody - should throw Error', () => {
    const invalidBody = {
      name: 'application/json',
      displayName: 'application/json',
      type: 'object',
      mimeType: 'application/json',
    };

    expect(() => {
      isValidBody(invalidBody);
    }).toThrow();
  });

  it('isValidBody - should be truthy', () => {
    const validBody = {
      name: 'IntegerTestType',
      displayName: 'IntegerTestType',
      description:
        'This is a type which contains test data for Integer properties.',
      type: 'object',
      mimeType: 'application/json',
    };

    expect(isValidBody(validBody)).toBeTruthy();
  });

  it('processMethodResponses', () => {
    const arrayBefore = [
      {
        body: [
          {
            key: 'application/json',
            name: 'ImportSink',
          },
        ],
      },
      {
        body: [
          {
            key: 'application/json',
            name: 'ErrorResponse',
          },
        ],
      },
    ];
    const arrayAfter = [
      {
        body: [
          {
            mimeType: 'application/json',
            name: 'ImportSink',
          },
        ],
      },
      {
        body: [
          {
            mimeType: 'application/json',
            name: 'ErrorResponse',
          },
        ],
      },
    ];

    Object.freeze(arrayBefore);

    expect(processMethodResponses(arrayBefore)).toEqual(arrayAfter);
  });

  it('mutateKeyToMimeType', () => {
    const objectBefore = {
      key: 'application/json',
      name: 'FloatTestType',
    };
    const objectAfter = {
      mimeType: 'application/json',
      name: 'FloatTestType',
    };

    Object.freeze(objectBefore);

    expect(mutateKeyToMimeType(objectBefore)).toEqual(objectAfter);
  });
});
