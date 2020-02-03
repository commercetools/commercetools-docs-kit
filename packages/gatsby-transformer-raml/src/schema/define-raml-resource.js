const defineRamlResource = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlResource',
      fields: {
        apiKey: 'String!',
        resourceName: 'String!',
        resourcePathUri: 'String!',
        description: 'String',
        uriParameters: '[RamlResourceUriParameter!]',
        post: 'RamlResourceMethod',
        put: 'RamlResourceMethod',
        get: 'RamlResourceMethod',
        delete: 'RamlResourceMethod',
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
        required: 'Boolean!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethod',
      fields: {
        securedBy: '[RamlResourceSecuredByOAuth!]',
        displayName: 'String',
        description: 'String',
        queryParameters: '[RamlResourceQueryParameter]',
        body: 'RamlResourceMethodBody',
        responses: '[RamlResourceResponse!]',
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
      name: 'RamlResourceQueryParameter',
      fields: {
        name: 'String!',
        required: 'Boolean',
        type: 'String!',
        builtinType: 'String!',
        description: 'String',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceResponse',
      fields: {
        code: 'Int!',
        description: 'String',
        body: 'RamlResourceMethodBody!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBody',
      fields: {
        applicationjson: 'RamlResourceMethodBodyApplicationJson',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBodyApplicationJson',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),
  ];

  createTypes(typeDefs);
};

module.exports = defineRamlResource;
