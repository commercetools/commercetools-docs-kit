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
        enumGroups: '[RamlTypeEnumGroup!]',
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
      name: 'RamlTypeEnumGroup',
      fields: {
        name: 'String!',
        description: 'String!',
      },
    }),
    schema.buildObjectType({
      name: 'RamlExample',
      fields: {
        name: 'String!',
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
        inherited: 'Boolean!',
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
        unionParams: '[RamlTypePropertyUnionParameter!]',
        uniqueItems: 'Boolean',
      },
    }),
    schema.buildObjectType({
      name: 'RamlTypePropertyUnionParameter',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),
  ];
  createTypes(typeDefs);
};

export default defineRamlType;
