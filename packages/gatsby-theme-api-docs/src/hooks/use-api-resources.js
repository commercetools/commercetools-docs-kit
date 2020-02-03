import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  const queryResult = useStaticQuery(
    graphql`
      fragment methods on RamlResourceMethod {
        securedBy {
          oauth_2_0 {
            scopes
          }
        }
        displayName
        description
        queryParameters {
          name
          required
          type
          builtinType
          description
        }
        body {
          applicationjson {
            type
            builtinType
          }
        }
        responses {
          code
          description
          body {
            applicationjson {
              type
              builtinType
            }
          }
        }
      }

      query GetAllRamlResources {
        allRamlResource {
          nodes {
            apiKey
            resourceName
            resourcePathUri
            description
            uriParameters {
              name
              type
              builtinType
              description
              required
            }
            post {
              ...methods
            }
            put {
              ...methods
            }
            get {
              ...methods
            }
            delete {
              ...methods
            }
          }
        }
      }
    `
  );

  return queryResult.allRamlResource.nodes;
};
