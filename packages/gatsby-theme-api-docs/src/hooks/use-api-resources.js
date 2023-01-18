import { useStaticQuery, graphql } from 'gatsby';

export const useApiResources = () => {
  const queryResult = useStaticQuery(
    graphql`
      fragment methods on Method {
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
          items {
            type
          }
          unionParams {
            builtinType
            type
          }
        }
        responses {
          code
          description
          body {
            applicationjson {
              type
              builtinType
              examples {
                name
                value
              }
            }
          }
        }
        codeExamples {
          language
          value
        }
      }

      fragment methodBodies on RamlResourceMethodBody {
        applicationjson {
          type
          builtinType
        }
        applicationxwwwformurlencoded {
          type
          builtinType
        }
        imagejpeg {
          type
          builtinType
        }
        imagepng {
          type
          builtinType
        }
        imagegif {
          type
          builtinType
        }
      }

      fragment methodsWithBodies on RamlResourceMethodWithBody {
        ...methods
        body {
          ...methodBodies
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
              ...methodsWithBodies
            }
            put {
              ...methodsWithBodies
            }
            patch {
              ...methodsWithBodies
            }
            get {
              ...methods
            }
            head {
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

// A static property key based index for fast access in large APIs
const byKeyAndResourcePathUriIndex = {};
var isIndexed = false;
const index = (apiResources) => {
  if (!isIndexed) {
    apiResources.forEach((apiResource) => {
      byKeyAndResourcePathUriIndex[
        apiResource.apiKey + '__' + apiResource.resourcePathUri
      ] = apiResource;
    });
  }
  isIndexed = true;
};

export const useApiResourceByApiKeyAndResourcePathUri = (
  apiKey = '',
  resourcePathUri = ''
) => {
  index(useApiResources());
  return byKeyAndResourcePathUriIndex[apiKey + '__' + resourcePathUri];
};
