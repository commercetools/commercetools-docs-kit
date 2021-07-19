import { useStaticQuery, graphql } from 'gatsby';

export const useApis = () => {
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

export const useApiByKey = (apiKey) => {
  const apis = useApis();

  return apis.find((api) => {
    return api.apiKey === apiKey;
  });
};
