import extractAdditionalInfo from './extract-additional-info';

describe('Ordering tags', () => {
  const data = createTestData();

  it('should order default property to the very top', () => {
    const sortedData = extractAdditionalInfo(data[0]);
    expect(JSON.stringify(sortedData)).toBe(
      JSON.stringify(expectedTestResults()[0])
    );
  });
  it('should order properties with min and max names to the top behind the default', () => {
    const sortedData = extractAdditionalInfo(data[1]);
    expect(JSON.stringify(sortedData)).toBe(
      JSON.stringify(expectedTestResults()[1])
    );
  });
  it('should order properties with min and max names to the very top if there is no default property', () => {
    const sortedData = extractAdditionalInfo(data[2]);
    expect(JSON.stringify(sortedData)).toBe(
      JSON.stringify(expectedTestResults()[2])
    );
  });
});

function createTestData() {
  return [
    {
      maxItems: 1,
      minItems: 2,
      uniqueItems: 2,
      default: 1,
    },
    {
      maximum: 1,
      default: 1,
      minimum: 2,
    },
    {
      minLength: 1,
      pattern: 2,
      maxLength: 1,
    },
  ];
}

function expectedTestResults() {
  return [
    {
      default: 1,
      minItems: 2,
      maxItems: 1,
      uniqueItems: 2,
    },
    {
      default: 1,
      minimum: 2,
      maximum: 1,
    },
    {
      minLength: 1,
      maxLength: 1,
      pattern: 2,
    },
  ];
}
