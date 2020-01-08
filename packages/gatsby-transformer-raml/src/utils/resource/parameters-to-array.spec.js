const parametersToArray = require('./parameters-to-array');

describe('parameters-to-array.js', () => {
  it('should transform objects of query parameters to array', () => {
    const parametersBefore = {
      where: {
        required: false,
        type: 'string',
        builtinType: 'string',
      },

      sort: {
        required: false,
        type: 'string',
        builtinType: 'string',
      },
    };

    const parametersAfter = [
      {
        name: 'where',
        required: false,
        type: 'string',
        builtinType: 'string',
      },
      {
        name: 'sort',
        required: false,
        type: 'string',
        builtinType: 'string',
      },
    ];

    expect(parametersToArray(parametersBefore)).toEqual(parametersAfter);
  });

  it('should transform number to float', () => {
    const parametersBefore = {
      limit: {
        required: false,
        type: 'integer',
        builtinType: 'integer',
      },

      height: {
        required: false,
        type: 'number',
        builtinType: 'number',
      },
    };

    const parametersAfter = [
      {
        name: 'limit',
        required: false,
        type: 'integer',
        builtinType: 'integer',
      },
      {
        name: 'height',
        required: false,
        type: 'float',
        builtinType: 'float',
      },
    ];

    expect(parametersToArray(parametersBefore)).toEqual(parametersAfter);
  });
});
