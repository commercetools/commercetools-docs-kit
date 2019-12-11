import { useStaticQuery, graphql } from 'gatsby';

export const useApiResources = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allRamlResource {
          nodes {
            apiKey
            displayName
            absoluteUri
            relativeUri
            parentUrl
            relativeUriPathSegments
            allUriParameters {
              description
              displayName
              key
              name
              required
              type
            }
            uriParameters {
              description
              displayName
              key
              name
              required
              type
            }
            securedBy {
              schemeName
              scopes
            }
            methods {
              displayName
              method
              description
              protocols
              queryParameters {
                key
                name
                displayName
                type
                description
                required
              }
              allUriParameters {
                key
                name
                displayName
                type
                description
                required
              }
              body {
                mimeType
                name
                displayName
                type
                description
                examples {
                  name
                  displayName
                  description
                  value
                }
              }
              responses {
                key
                code
                description
                body {
                  mimeType
                  name
                  displayName
                  type
                  description
                  examples {
                    name
                    displayName
                    description
                    value
                  }
                }
              }
              securedBy {
                schemeName
                scopes
              }
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
    const actualRelativeUri = `${resource.parentUrl}${resource.relativeUri}`;

    return resource.apiKey === apiKey && actualRelativeUri === resourcePath;
  });

  if (!matchedResource) {
    throw new Error(`Resource '${matchedResource}' not found in API`);
  }

  return matchedResource;
};

export const useReadMethodOfResourceByResourcePath = (
  apiKey,
  resourcePath,
  method
) => {
  const resource = useReadResourceByResourcePath(apiKey, resourcePath);

  const matchedMethod = resource.methods.find(resourceMethod => {
    return resourceMethod.method === method.toLowerCase();
  });

  if (!matchedMethod) {
    throw new Error(
      `Method '${method}' of resource '${resource}' not found in API`
    );
  }

  return { method: matchedMethod, url: resource.absoluteUri };
};
