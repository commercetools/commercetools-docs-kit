const defineRamlResource = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlResource',
      fields: {
        resourceName: 'String!',
        resourcePathUri: 'String!',
        uriParameters: '[RamlResourceUriParameter!]',
        post: 'RamlResourcePost',
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

    schema.buildObjectType({
      name: 'RamlResourcePost',
      fields: {
        securedBy: '[RamlResourceSecuredByOAuth]',
        displayName: 'String',
        description: 'String',
        body: 'RamlResourcePostBody',
        responses: '[RamlResourcePostResponses!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceSecuredByOAuth',
      fields: {
        oauth_2_0: 'RamlResourceSecuredByOAuthScopes',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceSecuredByOAuthScopes',
      fields: {
        scopes: '[String!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourcePostResponses',
      fields: {
        code: 'Int',
        description: 'String',
        body: 'RamlResourcePostBody!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourcePostBody',
      fields: {
        applicationjson: 'RamlResourcePostBodyApplicationJson',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourcePostBodyApplicationJson',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),
  ];

  createTypes(typeDefs);
};

module.exports = defineRamlResource;
