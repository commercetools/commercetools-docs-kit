import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  const queryResult = useStaticQuery(
    graphql`
      fragment portOrPutMethod on RamlResourcePost {
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
              ...portOrPutMethod
            }
            put {
              ...portOrPutMethod
            }
            get {
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
            delete {
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
          }
        }
      }
    `
  );

  return queryResult.allRamlResource.nodes;
};
