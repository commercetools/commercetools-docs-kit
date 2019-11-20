const defineRamlGenerics = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlExample',
      fields: {
        name: 'String',
        displayName: 'String',
        description: 'String',
        value: 'String!',
      },
    }),
  ];

  createTypes(typeDefs);
};

module.exports = defineRamlGenerics;
