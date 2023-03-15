import responsesToArray from './responses-to-array.mjs';

it('should transform objects of responses to array', () => {
  const responsesBefore = {
    201: {
      description:
        '201 Created response. This is the success response when creating something.',
      body: {
        applicationjson: {
          type: 'ObjectTestType',
          builtinType: 'object',
        },
      },
    },
  };

  const responsesAfter = [
    {
      code: 201,
      description:
        '201 Created response. This is the success response when creating something.',
      body: {
        applicationjson: {
          type: 'ObjectTestType',
          builtinType: 'object',
        },
      },
    },
  ];

  expect(responsesToArray(responsesBefore)).toEqual(responsesAfter);
});
