import { useStaticQuery, graphql } from 'gatsby';

const useApiResources = () => {
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

export default useApiResources;
