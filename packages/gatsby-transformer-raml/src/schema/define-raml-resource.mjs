const defineRamlResource = ({ schema, createTypes }) => {
  const typeDefs = [
    `
    interface Method {
      securedBy: [RamlResourceSecuredByOAuth!]
      displayName: String
      description: String
      queryParameters: [RamlResourceQueryParameter!]
      headers: [RamlResourceHeaders!]
      responses: [RamlResourceResponse!]
      codeExamples: [RamlResourceCodeExample!]
    }
    `,
    schema.buildObjectType({
      name: 'RamlResource',
      fields: {
        apiKey: 'String!',
        resourceName: 'String!',
        resourcePathUri: 'String!',
        description: 'String',
        uriParameters: '[RamlResourceUriParameter!]',
        post: 'RamlResourceMethodWithBody',
        put: 'RamlResourceMethodWithBody',
        patch: 'RamlResourceMethodWithBody',
        get: 'RamlResourceMethodWithoutBody',
        head: 'RamlResourceMethodWithoutBody',
        delete: 'RamlResourceMethodWithoutBody',
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
      name: 'RamlResourceMethodWithBody',
      fields: {
        securedBy: '[RamlResourceSecuredByOAuth!]',
        displayName: 'String',
        description: 'String',
        queryParameters: '[RamlResourceQueryParameter!]',
        headers: '[RamlResourceHeaders!]',
        body: 'RamlResourceMethodBody',
        responses: '[RamlResourceResponse!]',
        codeExamples: '[RamlResourceCodeExample!]',
      },
      interfaces: ['Method'],
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodWithoutBody',
      fields: {
        securedBy: '[RamlResourceSecuredByOAuth!]',
        displayName: 'String',
        description: 'String',
        queryParameters: '[RamlResourceQueryParameter!]',
        headers: '[RamlResourceHeaders!]',
        responses: '[RamlResourceResponse!]',
        codeExamples: '[RamlResourceCodeExample!]',
      },
      interfaces: ['Method'],
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
        default: 'String',
        type: 'String!',
        builtinType: 'String!',
        unionParams: '[RamlResourceQueryUnionParameter!]',
        description: 'String',
        items: 'RamlTypeItems',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceHeaders',
      fields: {
        header: 'String!',
        displayName: 'String',
        default: 'String',
        pattern: 'String',
        type: 'String',
        builtinType: 'String',
        description: 'String',
        required: 'Boolean',
        enum: '[String!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceQueryUnionParameter',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceResponse',
      fields: {
        code: 'Int!',
        description: 'String',
        body: 'RamlResourceMethodBody',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBody',
      fields: {
        applicationjson: 'RamlResourceMethodBodyApplicationJson',
        applicationxwwwformurlencoded:
          'RamlResourceMethodBodyApplicationxwwwformurlencoded',
        imagejpeg: 'RamlResourceMethodBodyImageJpeg',
        imagepng: 'RamlResourceMethodBodyImagePng',
        imagegif: 'RamlResourceMethodBodyImageGif',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBodyApplicationJson',
      fields: {
        type: 'String!',
        builtinType: 'String!',
        examples: '[RamlExample!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBodyApplicationxwwwformurlencoded',
      fields: {
        type: 'String!',
        builtinType: 'String!',
        examples: '[RamlExample!]',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBodyImageJpeg',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBodyImagePng',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceMethodBodyImageGif',
      fields: {
        type: 'String!',
        builtinType: 'String!',
      },
    }),

    schema.buildObjectType({
      name: 'RamlResourceCodeExample',
      fields: {
        language: 'String!',
        value: 'String!',
      },
    }),
  ];

  createTypes(typeDefs);
};

export default defineRamlResource;
