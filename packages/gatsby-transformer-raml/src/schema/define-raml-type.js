const defineRamlType = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlType',
      fields: {
        apiKey: 'String!',
        builtinType: 'String',
        constant: 'String',
        description: 'String',
        discriminator: 'String',
        discriminatorValue: 'String',
        displayName: 'String',
        enumDescriptions: '[RamlTypeEnumDescription!]',
        enumeration: '[String!]',
        examples: '[RamlExample!]',
        oneOf: '[String!]',
        properties: '[RamlTypeProperty!]',
        refersTo: 'String',
        type: 'String!',
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: 'RamlTypeEnumDescription',
      fields: {
        name: 'String!',
        description: 'String!',
      },
    }),
    schema.buildObjectType({
      name: 'RamlExample',
      fields: {
        key: 'String!',
        value: 'String!',
        displayName: 'String',
        description: 'String',
      },
    }),
    schema.buildObjectType({
      name: 'RamlTypeProperty',
      fields: {
        beta: 'Boolean',
        builtinType: 'String',
        constant: 'String',
        default: 'String',
        deprecated: 'Boolean',
        description: 'String',
        discriminatorValue: 'String',
        enumeration: '[String!]',
        items: 'RamlTypeItems',
        maxItems: 'Int',
        maxLength: 'Int',
        maximum: 'Float',
        minItems: 'Int',
        minLength: 'Int',
        minimum: 'Float',
        name: 'String!',
        pattern: 'String',
        required: 'Boolean!',
        type: 'String!',
        uniqueItems: 'Boolean',
      },
    }),

    // items describes an array field
    schema.buildObjectType({
      name: 'RamlTypeItems',
      fields: {
        type: 'String',
      },
    }),
  ];
  createTypes(typeDefs);
};

module.exports = defineRamlType;
