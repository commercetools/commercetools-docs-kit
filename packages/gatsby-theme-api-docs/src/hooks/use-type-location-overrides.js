import { useStaticQuery, graphql } from 'gatsby';

export const useTypeLocationOverrides = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allTypeLocationsYaml {
          nodes {
            api
            locations {
              type
              href
            }
          }
        }
      }
    `
  );

  return queryResult.allTypeLocationsYaml.nodes;
};
