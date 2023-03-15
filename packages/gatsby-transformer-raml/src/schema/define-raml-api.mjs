const defineRamlApi = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlApi',
      fields: {
        apiKey: 'String!',
        title: 'String',
        baseUri: 'String!',
        baseUriParameters: '[RamlApiBaseUriParameter!]',
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),

    schema.buildObjectType({
      name: 'RamlApiBaseUriParameter',
      fields: {
        name: 'String!',
        type: 'String!',
        builtinType: 'String!',
        description: 'String',
        enum: ['String!'],
        required: 'Boolean',
      },
    }),
  ];

  createTypes(typeDefs);
};

export default defineRamlApi;
