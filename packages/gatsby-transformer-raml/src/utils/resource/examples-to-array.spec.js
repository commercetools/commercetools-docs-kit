const examplesToArray = require('./examples-to-array');

it('should transform objects of examples to array', () => {
  const examplesBefore = {
    default: {
      strict: true,
      value:
        '!include ../examples/ByProjectKeyCustomObjectsPost-201-default.json',
    },
    case1: {
      strict: false,
      value:
        '!include ../examples/ByProjectKeyCustomObjectsPost-201-case1.json',
    },
  };

  const examplesAfter = [
    {
      key: 'default',
      strict: true,
      value:
        '!include ../examples/ByProjectKeyCustomObjectsPost-201-default.json',
    },
    {
      key: 'case1',
      strict: false,
      value:
        '!include ../examples/ByProjectKeyCustomObjectsPost-201-case1.json',
    },
  ];

  expect(examplesToArray(examplesBefore)).toEqual(examplesAfter);
});
