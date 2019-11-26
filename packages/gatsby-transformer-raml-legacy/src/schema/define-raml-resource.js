const defineRamlResource = ({ schema, createTypes }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'RamlResource',
      fields: {
        // raml2Obj - main
        id: 'String!',
        absoluteUri: 'String!',
        displayName: 'String',
        parentUrl: 'String',
        relativeUri: 'String!',
        relativeUriPathSegments: '[String!]',
        allUriParameters: '[RamlResourceParameter!]',
        uriParameters: '[RamlResourceParameter!]',
        securedBy: '[RamlResourceSecuredBy!]',
        methods: '[RamlResourceMethod!]',

        // raml-plugin - main
        apiKey: 'String!',
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: 'RamlResourceMethod',
      fields: {
        displayName: 'String',
        method: 'String!',
        description: 'String',
        protocols: '[String!]',
        allUriParameters: '[RamlResourceParameter!]',
        queryParameters: '[RamlResourceParameter!]',
        securedBy: '[RamlResourceSecuredBy!]',
        body: '[RamlResourceMethodBody]',
        responses: '[RamlResourceMethodResponse]',
      },
    }),
    schema.buildObjectType({
      name: 'RamlResourceParameter',
      fields: {
        key: 'String!',
        name: 'String!',
        displayName: 'String',
        description: 'String',
        type: 'String!',
        required: 'Boolean!',
      },
    }),
    schema.buildObjectType({
      name: 'RamlResourceSecuredBy',
      fields: {
        schemeName: 'String!',
        scopes: '[String!]',
      },
    }),
    schema.buildObjectType({
      name: 'RamlResourceMethodResponse',
      fields: {
        key: 'String!',
        description: 'String',
        code: 'String!',
        body: '[RamlResourceMethodBody!]',
      },
    }),
    schema.buildObjectType({
      name: 'RamlResourceMethodBody',
      fields: {
        mimeType: 'String!',
        name: 'String!',
        displayName: 'String',
        description: 'String',
        type: 'String',
        examples: '[RamlExample!]',
      },
    }),
  ];

  createTypes(typeDefs);
};

module.exports = defineRamlResource;
