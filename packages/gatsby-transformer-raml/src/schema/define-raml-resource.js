const defineRamlResource = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlResource',
      fields: {
        resourceName: 'String!',
        resourcePathUri: 'String!',
        description: 'String',
        uriParameters: '[RamlResourceUriParameter!]',
        post: 'RamlResourcePost',
        get: 'RamlResourceGet',
        delete: 'RamlResourceDelete',
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
        securedBy: '[RamlResourceSecuredByOAuth!]',
        displayName: 'String',
        description: 'String',
        queryParameters: '[RamlResourceQueryParameter]',
        body: 'RamlResourcePostBody',
        responses: '[RamlResourceResponse!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceGet',
      fields: {
        securedBy: '[RamlResourceSecuredByOAuth!]',
        displayName: 'String',
        description: 'String',
        queryParameters: '[RamlResourceQueryParameter]',
        responses: '[RamlResourceResponse!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceDelete',
      fields: {
        securedBy: '[RamlResourceSecuredByOAuth!]',
        displayName: 'String',
        description: 'String',
        queryParameters: '[RamlResourceQueryParameter]',
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
