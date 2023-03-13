import parametersToArray from './parameters-to-array.mjs';

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
        unionParams: [],
      },
      {
        name: 'sort',
        required: false,
        type: 'string',
        builtinType: 'string',
        unionParams: [],
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
        unionParams: [],
      },
      {
        name: 'height',
        required: false,
        type: 'Float',
        builtinType: 'Float',
        unionParams: [],
      },
    ];

    expect(parametersToArray(parametersBefore)).toEqual(parametersAfter);
  });

  it('should properly convert union types transform number to float', () => {
    const parametersBefore = {
      unionParameter: {
        required: false,
        type: 'integer | string | number',
        builtinType: 'Union',
      },
    };

    const parametersAfter = [
      {
        name: 'unionParameter',
        required: false,
        type: 'Union',
        builtinType: 'Union',
        unionParams: [
          { type: 'Int', builtinType: 'Int' },
          { type: 'string', builtinType: 'string' },
          { type: 'Float', builtinType: 'Float' },
        ],
      },
    ];

    expect(parametersToArray(parametersBefore)).toEqual(parametersAfter);
  });
});
