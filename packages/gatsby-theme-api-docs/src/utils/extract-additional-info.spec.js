import extractAdditionalInfo from './extract-additional-info';

describe('Ordering tags', () => {
  const data = createTestData();

  it('should order default property to the very top', () => {
    const sortedData = extractAdditionalInfo(data[0]);
    expect(sortedData).toEqual(expectedTestResults()[0]);
  });
  it('should order properties with min and max names to the top behind the default', () => {
    const sortedData = extractAdditionalInfo(data[1]);
    expect(sortedData).toEqual(expectedTestResults()[1]);
  });
  it('should order properties with min and max names to the very top if there is no default property', () => {
    const sortedData = extractAdditionalInfo(data[2]);
    expect(sortedData).toEqual(expectedTestResults()[2]);
  });
});

function createTestData() {
  return [
    {
      maxItems: 2,
      minItems: 2,
      uniqueItems: true,
      default: 1,
    },
    {
      maximum: 1,
      default: 2,
      minimum: 1,
    },
    {
      minLength: 1,
      pattern: true,
      maxLength: 1,
    },
  ];
}

function expectedTestResults() {
  return [
    [
      {
        name: 'default',
        value: 1,
      },
      {
        name: 'minItems',
        value: 2,
      },
      {
        name: 'maxItems',
        value: 2,
      },
      {
        name: 'uniqueItems',
        value: true,
      },
    ],
    [
      {
        name: 'default',
        value: 2,
      },
      {
        name: 'minimum',
        value: 1,
      },
      {
        name: 'maximum',
        value: 1,
      },
    ],
    [
      {
        name: 'minLength',
        value: 1,
      },
      {
        name: 'maxLength',
        value: 1,
      },
      {
        name: 'pattern',
        value: true,
      },
    ],
  ];
}
