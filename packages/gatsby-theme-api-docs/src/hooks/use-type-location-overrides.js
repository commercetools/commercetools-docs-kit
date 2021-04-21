import { useStaticQuery, graphql } from 'gatsby';

export const useTypeLocationOverrides = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allTypeLocationsYaml {
          nodes {
            apiKey
            type
            href
          }
        }
      }
    `
  );

  return queryResult.allTypeLocationsYaml.nodes;
};
