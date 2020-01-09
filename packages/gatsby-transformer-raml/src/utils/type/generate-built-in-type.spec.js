const generateBuiltinType = require('./generate-built-in-type');

describe('transforms built in types for custom use case', () => {
  it('should return number for integer built in type', () => {
    const property = { builtinType: 'integer' };
    expect(generateBuiltinType(property)).toBe('number');
  });

  it('should return string for date-only built in type', () => {
    const property = { builtinType: 'date-only' };

    expect(generateBuiltinType(property)).toBe('string');
  });

  it('should return string for time-only built in type', () => {
    const property = { builtinType: 'time-only' };

    expect(generateBuiltinType(property)).toBe('string');
  });

  it('should return string for datetime-only built in type', () => {
    const property = { builtinType: 'datetime-only' };

    expect(generateBuiltinType(property)).toBe('string');
  });

  it('should return string for datetime built in type', () => {
    const property = { builtinType: 'datetime' };

    expect(generateBuiltinType(property)).toBe('string');
  });
});
