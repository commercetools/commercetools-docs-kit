import { useStaticQuery, graphql } from 'gatsby';

export const useTypeLocationOverrides = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allTypeLocationsYaml {
          nodes {
            type
            path
          }
        }
      }
    `
  );

  return queryResult.allTypeLocationsYaml.nodes;
};
