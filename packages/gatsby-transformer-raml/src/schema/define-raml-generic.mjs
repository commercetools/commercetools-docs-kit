// this includes schema definitions that are used in 2 or more schemas

const defineRamlGeneric = ({ schema, createTypes }) => {
  const typeDefs = [
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

export default defineRamlGeneric;
