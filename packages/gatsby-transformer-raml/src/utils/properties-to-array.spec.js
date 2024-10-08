import propertiesToArray from './properties-to-array.mjs';

describe('properties-to-array.js', () => {
  it('should transform objects of query parameters to array', () => {
    const propertiesBefore = {
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

    const propertiesAfter = [
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

    expect(propertiesToArray(propertiesBefore)).toEqual(propertiesAfter);
  });

  it('should transform number to float', () => {
    const propertiesBefore = {
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

    const propertiesAfter = [
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

    expect(propertiesToArray(propertiesBefore)).toEqual(propertiesAfter);
  });

  it('should properly convert union types transform number to float', () => {
    const propertiesBefore = {
      unionParameter: {
        required: false,
        type: 'integer | string | number',
        builtinType: 'Union',
      },
    };

    const propertiesAfter = [
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

    expect(propertiesToArray(propertiesBefore)).toEqual(propertiesAfter);
  });
});
