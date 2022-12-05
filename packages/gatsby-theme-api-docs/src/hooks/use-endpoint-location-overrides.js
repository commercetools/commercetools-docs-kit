import { useStaticQuery, graphql } from 'gatsby';

export const useEndpointLocationOverrides = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allEndpointLocationsYaml {
          nodes {
            api
            locations {
              resource
              method
              href
            }
          }
        }
      }
    `
  );

  return queryResult.allEndpointLocationsYaml.nodes;
};
