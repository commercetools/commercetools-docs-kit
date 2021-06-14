import { useStaticQuery, graphql } from 'gatsby';

const useApis = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allRamlApi {
          nodes {
            apiKey
            title
            baseUri
            baseUriParameters {
              name
              type
              builtinType
              description
              enum
              required
            }
          }
        }
      }
    `
  );

  return queryResult.allRamlApi.nodes;
};

export default useApis;
