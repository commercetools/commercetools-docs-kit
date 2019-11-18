const defineRamlType = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlType',
      fields: {
        // raml2Obj - main
        key: 'String!',
        name: 'String!',
        type: 'String!',
        discriminator: 'String',
        discriminatorValue: 'String',
        description: 'String',
        additionalProperties: 'Boolean',
        properties: '[RamlTypeProperty!]',
        examples: '[RamlExample!]',

        // raml-plugin - main
        apiKey: 'String!',
        originalType: 'String',
        library: 'String',
        constant: 'String',
        unionLike: 'Boolean',
        enumeration: '[String!]',
        beta: 'Boolean',
        deprecated: 'Boolean',
        enumDescriptions: '[RamlTypeEnumDescription!]',
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: 'RamlTypeProperty',
      fields: {
        // raml2Obj - property
        name: 'String!',
        description: 'String',
        type: 'String!',
        default: 'String',
        minLength: 'Int',
        maxLength: 'Int',
        minimum: 'Float',
        maximum: 'Float',
        pattern: 'String',
        items: 'RamlTypeItems',
        minItems: 'Int',
        maxItems: 'Int',
        uniqueItems: 'Boolean',
        anyOf: '[RamlTypeAnyOf!]',
        required: 'Boolean',

        // raml-plugin - property
        originalType: 'String',
        constant: 'String',
        library: 'String',
        enumeration: '[String!]',
        beta: 'Boolean',
        deprecated: 'Boolean',
        enumDescriptions: '[RamlTypeEnumDescription!]',
      },
    }),
    // items describes an array field
    schema.buildObjectType({
      name: 'RamlTypeItems',
      fields: {
        originalType: 'String',
        type: 'String',
      },
    }),
    // anyOf describes a union field
    schema.buildObjectType({
      name: 'RamlTypeAnyOf',
      fields: {
        type: 'String',
        name: 'String',
      },
    }),
    schema.buildObjectType({
      name: 'RamlTypeEnumDescription',
      fields: {
        name: 'String!',
        description: 'String!',
      },
    }),
  ];
  createTypes(typeDefs);
};

module.exports = defineRamlType;
