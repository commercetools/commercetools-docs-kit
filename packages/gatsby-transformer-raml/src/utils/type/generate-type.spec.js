import generateType from './generate-type.mjs';

describe('transforms types for custom use case', () => {
  it('should return Int for integer type', () => {
    const property = { type: 'integer' };
    expect(generateType(property)).toBe('Int');
  });

  it('should return Float for number type', () => {
    const property = { type: 'number' };
    expect(generateType(property)).toBe('Float');
  });

  it('should return Date for date-only type', () => {
    const property = { type: 'date-only' };
    expect(generateType(property)).toBe('Date');
  });

  it('should return Time for time-only type', () => {
    const property = { type: 'time-only' };
    expect(generateType(property)).toBe('Time');
  });

  it('should return DateTimeOnly for datetime-only type', () => {
    const property = { type: 'datetime-only' };
    expect(generateType(property)).toBe('DateTimeOnly');
  });

  it('should return DateTime for datetime', () => {
    const property = { type: 'datetime' };
    expect(generateType(property)).toBe('DateTime');
  });

  it('should return DateTime for datetime with format that is NOT rfc2616', () => {
    const property = { type: 'datetime', format: 'rfc3339' };
    expect(generateType(property)).toBe('DateTime');
  });

  it('should return DateTimeRfc2616 for datetime with format rfc2616', () => {
    const property = { type: 'datetime', format: 'rfc2616' };
    expect(generateType(property)).toBe('DateTimeRfc2616');
  });
});
