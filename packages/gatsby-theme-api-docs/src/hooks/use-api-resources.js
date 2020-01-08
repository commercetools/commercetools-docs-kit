import { useStaticQuery, graphql } from 'gatsby';

export const useApiResources = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
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
            }
            post {
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
              absoluteUri
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
              absoluteUri
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
              absoluteUri
            }
          }
        }
      }
    `
  );

  return queryResult.allRamlResource.nodes;
};

export const useReadResourceByResourcePath = (apiKey, resourcePath) => {
  const resources = useApiResources();

  const matchedResource = resources.find(resource => {
    return (
      resource.apiKey === apiKey && resource.resourcePathUri === resourcePath
    );
  });

  return matchedResource;
};

export const useReadMethodOfResourceByResourcePath = (
  apiKey,
  resourcePath,
  method
) => {
  const resource = useReadResourceByResourcePath(apiKey, resourcePath);

  if (resource) {
    return resource[method.toLowerCase()];
  }

  return undefined;
};
