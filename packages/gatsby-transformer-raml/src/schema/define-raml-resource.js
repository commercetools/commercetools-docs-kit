const defineRamlResource = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlResource',
      fields: {
        resourceName: 'String!',
        resourcePathUri: 'String!',
        uriParameters: '[RamlResourceUriParameter!]',
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: 'RamlResourceUriParameter',
      fields: {
        name: 'String!',
        type: 'String!',
        builtinType: 'String!',
        description: 'String',
      },
    }),
  ];

  createTypes(typeDefs);
};

module.exports = defineRamlResource;
