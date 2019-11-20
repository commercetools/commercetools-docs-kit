const {
  resolveConflictingFieldTypes,
  sortBasedOnMovePropertiesTo,
  annotateUnionLike,
  renameEnumField,
  addConstants,
  generateCustomNumberScalar,
  generateOriginalType,
  generateType,
  flattenNamespaces,
  annotationsToObject,
} = require('../../../src/from-api/create-types-nodes/post-process-types');

describe('PostProcessor', () => {
  // resolveConflictingFieldTypes
  it('resolves conflicting default field types', () => {
    const propertiesBefore = [
      { default: 1 },
      { default: 1.5 },
      { default: true },
      { default: '0' },
      { default: { default: 0 } },
    ];
    const propertiesAfter = [
      { default: '1' },
      { default: '1.5' },
      { default: 'true' },
      { default: '0' },
      { default: '{"default":0}' },
    ];

    Object.freeze(propertiesBefore);

    expect(resolveConflictingFieldTypes(propertiesBefore)).toEqual(
      propertiesAfter
    );
  });

  it('resolves conflicting enum field types', () => {
    const propertiesBefore = [
      { enum: [1, 2, 3] },
      { enum: [1.0, 2.5, 3.0] },
      { enum: ['dog', 'cat', 'elephant'] },
      { enum: ['self'] },
    ];
    const propertiesAfter = [
      { enum: ['1', '2', '3'] },
      { enum: ['1', '2.5', '3'] },
      { enum: ['dog', 'cat', 'elephant'] },
      { enum: ['self'] },
    ];

    Object.freeze(propertiesBefore);

    expect(resolveConflictingFieldTypes(propertiesBefore)).toEqual(
      propertiesAfter
    );
  });

  it('resolves conflicting enum and default field types', () => {
    const propertiesBefore = [
      { enum: [1, 2, 3], default: 1 },
      { enum: [1.0, 2.5, 3.0], default: 1.5 },
    ];
    const propertiesAfter = [
      { enum: ['1', '2', '3'], default: '1' },
      { enum: ['1', '2.5', '3'], default: '1.5' },
    ];

    Object.freeze(propertiesBefore);

    expect(resolveConflictingFieldTypes(propertiesBefore)).toEqual(
      propertiesAfter
    );
  });

  // sortBasedOnMovePropertiesTo

  it('sorts properties content based on movePropertiesToTop and movePropertiesToBottom arrays', () => {
    const propertiesBefore = [
      { name: 'eigthProperty' },
      { name: 'createdBy' },
      { name: 'ninthProperty' },
      { name: 'key' },
      { name: 'tenthProperty' },
      { name: 'custom' },
      { name: 'eleventhPropery' },
      { name: 'id' },
      { name: 'twelthProperty' },
      { name: 'lastModifiedBy' },
      { name: 'thirteenthProperty' },
      { name: 'lastModifiedAt' },
      { name: 'fourteenthProperty' },
      { name: 'fifteenthProperty' },
      { name: 'createdAt' },
      { name: 'version' },
    ];
    const propertiesAfter = [
      { name: 'id' },
      { name: 'version' },
      { name: 'key' },
      { name: 'createdAt' },
      { name: 'createdBy' },
      { name: 'lastModifiedAt' },
      { name: 'lastModifiedBy' },
      { name: 'eigthProperty' },
      { name: 'ninthProperty' },
      { name: 'tenthProperty' },
      { name: 'eleventhPropery' },
      { name: 'twelthProperty' },
      { name: 'thirteenthProperty' },
      { name: 'fourteenthProperty' },
      { name: 'fifteenthProperty' },
      { name: 'custom' },
    ];
    const movePropertiesToTop = [
      'id',
      'version',
      'key',
      'createdAt',
      'createdBy',
      'lastModifiedAt',
      'lastModifiedBy',
    ];
    const movePropertiesToBottom = ['custom'];

    Object.freeze(propertiesBefore);

    expect(
      sortBasedOnMovePropertiesTo(
        propertiesBefore,
        movePropertiesToTop,
        movePropertiesToBottom
      )
    ).toEqual(propertiesAfter);
  });

  // annotateUnionLike

  it('adds "unionLike" field to an object if object is union-like', () => {
    const objectBefore = {
      type: 'object',
      discriminator: 'kind',
      properties: [{ kind: { type: 'string' } }],
    };
    const objectAfter = {
      type: 'object',
      discriminator: 'kind',
      properties: [{ kind: { type: 'string' } }],
      unionLike: true,
    };

    Object.freeze(objectBefore);

    expect(annotateUnionLike(objectBefore, true)).toEqual(objectAfter);
  });

  it('will not add "unionLike" if all conditions for union-like type are not met', () => {
    const object1 = {
      type: 'object',
      discriminator: 'kind',
    };
    const object2 = {
      type: 'object',
      properties: [{ kind: { type: 'string' } }],
    };

    Object.freeze(object1);
    Object.freeze(object2);

    expect(annotateUnionLike(object1, true)).toEqual(object1);
    expect(annotateUnionLike(object2, true)).toEqual(object2);
  });

  // renameEnumField

  it('"enum" field becomes "enumeration" field', () => {
    const objBefore = { enum: ['self'] };
    const objAfter = { enumeration: ['self'] };

    Object.freeze(objBefore);

    expect(renameEnumField(objBefore)).toEqual(objAfter);
  });

  it('object remains the same if no enum', () => {
    const objBefore = { type: 'string' };
    const objAfter = { type: 'string' };

    Object.freeze(objBefore);

    expect(renameEnumField(objBefore)).toEqual(objAfter);
  });

  // addConstants

  it('adds "constant" field to an object', () => {
    const objBefore = { enumeration: ['self'] };
    const objAfter = { enumeration: ['self'], constant: 'self' };

    Object.freeze(objBefore);

    expect(addConstants(objBefore)).toEqual(objAfter);
  });

  // If originalType

  it('returns { type: "number", originalType: "SomeSuperNiceName" } if { type: "number", originalType: "SomeSuperNiceName" }', () => {
    const objBefore = {
      type: 'number',
      originalType: 'SomeSuperNiceName',
    };
    const objAfter = {
      type: 'number',
      originalType: 'SomeSuperNiceName',
    };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  // If format

  it('returns { type: "number", originalType: "Int" } if { type: "integer", format: "int" }', () => {
    const objBefore = { type: 'integer', format: 'int' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Int" } if { type: "integer", format: "int8" }', () => {
    const objBefore = { type: 'integer', format: 'int8' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Int" } if { type: "integer", format: "int16" }', () => {
    const objBefore = { type: 'integer', format: 'int16' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Int" } if { type: "number", format: "int32" }', () => {
    const objBefore = { type: 'number', format: 'int32' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Int" } if { type: "number", format: "int64" }', () => {
    const objBefore = { type: 'number', format: 'int64' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Int" } if { type: "number", format: "long" }', () => {
    const objBefore = { type: 'number', format: 'long' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Float" } if { type: "number", format: "float" }', () => {
    const objBefore = { type: 'number', format: 'float' };
    const objAfter = { type: 'number', originalType: 'Float' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Float" } if { type: "number", format: "double" }', () => {
    const objBefore = { type: 'number', format: 'double' };
    const objAfter = { type: 'number', originalType: 'Float' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  // If no format

  it('returns { type: "number", originalType: "Int" } if { type: "integer" }', () => {
    const objBefore = { type: 'integer' };
    const objAfter = { type: 'number', originalType: 'Int' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Float" } if { type: "float" }', () => {
    const objBefore = { type: 'float' };
    const objAfter = { type: 'number', originalType: 'Float' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number", originalType: "Float" } if { type: "double" }', () => {
    const objBefore = { type: 'float' };
    const objAfter = { type: 'number', originalType: 'Float' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  it('returns { type: "number" } if { type: "number" }', () => {
    const objBefore = { type: 'number' };
    const objAfter = { type: 'number' };

    Object.freeze(objBefore);

    expect(generateCustomNumberScalar(objBefore)).toEqual(objAfter);
  });

  // generateOriginalType
  it('generateOriginalType - returns appropriate originalType as s string', () => {
    expect(
      generateOriginalType({ originalType: 'CtCustomDate', type: 'date-only' })
    ).toBe('CtCustomDate');
    expect(generateOriginalType({ type: 'date-only' })).toBe('Date');
    expect(generateOriginalType({ type: 'time-only' })).toBe('Time');
    expect(generateOriginalType({ type: 'datetime-only' })).toBe(
      'DateTimeOnly'
    );
    expect(generateOriginalType({ type: 'datetime' })).toBe('DateTime');
    expect(generateOriginalType({ type: 'datetime', format: 'rfc3339' })).toBe(
      'DateTime'
    );
    expect(generateOriginalType({ type: 'datetime', format: 'rfc2616' })).toBe(
      'DateTimeRfc2616'
    );
    expect(generateOriginalType({ type: 'string' })).toBe('string');
  });

  // generateType
  it('returns "string" if type is datetime|date-only|time-only|datetime-only', () => {
    expect(generateType({ type: 'datetime' })).toBe('string');
    expect(generateType({ type: 'date-only' })).toBe('string');
    expect(generateType({ type: 'time-only' })).toBe('string');
    expect(generateType({ type: 'datetime-only' })).toBe('string');
    expect(generateType({ type: 'object', enumeration: ['a', 'b'] })).toBe(
      'string'
    );
    expect(generateType({ type: 'object' })).toBe('object');
    expect(generateType({ type: 'number' })).toBe('number');
  });

  // flattenNamespaces

  it('flattens namespace', () => {
    const objBefore = { originalType: 'foo.CustomType' };
    const objAfter = { originalType: 'CustomType', library: 'foo' };

    Object.freeze(objBefore);

    expect(flattenNamespaces(objBefore)).toEqual(objAfter);
  });

  it('flattens nested namespace', () => {
    const objBefore = { originalType: 'foo.bar.CustomType' };
    const objAfter = { originalType: 'CustomType', library: 'foo.bar' };

    Object.freeze(objBefore);

    expect(flattenNamespaces(objBefore)).toEqual(objAfter);
  });

  // annotationsToObject

  it('transforms array of boolean annotations to objects', () => {
    const arrayBefore = [
      { key: 'beta', structuredValue: true },
      { key: 'deprecated', structuredValue: true },
    ];
    const objAfter = { beta: true, deprecated: true };

    Object.freeze(arrayBefore);

    expect(annotationsToObject(arrayBefore)).toEqual(objAfter);
  });

  it('transforms array of object annotations to objects', () => {
    const arrayBefore = [
      {
        key: 'enumDescriptions',
        structuredValue: {
          value1: 'description 1',
          value2: 'description 2',
          value3: 'description 3',
        },
      },
    ];
    const objAfter = {
      enumDescriptions: [
        {
          name: 'value1',
          description: 'description 1',
        },
        {
          name: 'value2',
          description: 'description 2',
        },
        {
          name: 'value3',
          description: 'description 3',
        },
      ],
    };

    Object.freeze(arrayBefore);

    expect(annotationsToObject(arrayBefore)).toEqual(objAfter);
  });
});
