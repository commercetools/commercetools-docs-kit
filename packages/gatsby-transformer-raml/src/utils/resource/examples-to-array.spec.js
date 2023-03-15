import { examplesToArray } from './examples-to-array.mjs';

const mockJsonExampleContent = '{"someAttribute": "someValue"}';

function mockResolveExampleFile() {
  return mockJsonExampleContent;
}

it('should transform objects of examples to array', () => {
  const examplesBefore = {
    default: {
      value:
        '!include ../examples/ByProjectKeyCustomObjectsPost-201-default.json',
    },
    case1: {
      value:
        '!include ../examples/ByProjectKeyCustomObjectsPost-201-case1.json',
    },
  };

  const examplesAfter = [
    {
      name: 'default',
      value: mockJsonExampleContent,
    },
    {
      name: 'case1',
      value: mockJsonExampleContent,
    },
  ];

  expect(examplesToArray(examplesBefore, '', mockResolveExampleFile)).toEqual(
    examplesAfter
  );
});
