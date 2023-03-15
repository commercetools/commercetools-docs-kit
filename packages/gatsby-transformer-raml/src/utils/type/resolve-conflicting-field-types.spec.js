import resolveConflictingFieldTypes from './resolve-conflicting-field-types.mjs';

describe('resolves arrays and objects to strings', () => {
  it('should resolve enum, an array of integers, to array of strings', () => {
    const propertiesBefore = {
      enumeration: [1, 2, 3],
    };
    const propertiesAfter = {
      enumeration: ['1', '2', '3'],
    };

    Object.freeze(propertiesBefore);

    expect(resolveConflictingFieldTypes(propertiesBefore)).toEqual(
      propertiesAfter
    );
  });

  it('should resolve default, an object, to JSON string', () => {
    const propertiesBefore = {
      default: { value: 1 },
    };
    const propertiesAfter = {
      default: '{"value":1}',
    };

    Object.freeze(propertiesBefore);

    expect(resolveConflictingFieldTypes(propertiesBefore)).toEqual(
      propertiesAfter
    );
  });

  it('should resolve default, a scalar, to string', () => {
    const propertiesBefore = {
      default: true,
    };
    const propertiesAfter = {
      default: 'true',
    };

    Object.freeze(propertiesBefore);

    expect(resolveConflictingFieldTypes(propertiesBefore)).toEqual(
      propertiesAfter
    );
  });
});
