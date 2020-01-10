/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';

export const useApiTypes = () => {
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

export const useApiByApiKey = apiKey => {
  const apis = useApiTypes();

  return apis.find(api => {
    return api.apiKey === apiKey;
  });
};
