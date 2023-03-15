import computeType from './compute-type.mjs';

describe('returns appropriate type for an array and object', () => {
  it('should return array', () => {
    expect(computeType([])).toBe('array');
  });

  it('should return object', () => {
    expect(computeType({})).toBe('object');
  });
});
