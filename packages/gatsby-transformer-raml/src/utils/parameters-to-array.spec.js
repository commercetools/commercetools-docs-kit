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
        type: 'Int',
        builtinType: 'Int',
      },
      {
        name: 'height',
        required: false,
        type: 'Float',
        builtinType: 'Float',
      },
    ];

    expect(parametersToArray(parametersBefore)).toEqual(parametersAfter);
  });
});
