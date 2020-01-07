const queryParametersToArray = require('./query-parameters-to-array');

it('should transform objects of query parameters to array', () => {
  const queryParametersBefore = {
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

  const queryParametersAfter = [
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

  expect(queryParametersToArray(queryParametersBefore)).toEqual(
    queryParametersAfter
  );
});
