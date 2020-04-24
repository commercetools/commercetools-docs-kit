import { useStaticQuery, graphql } from 'gatsby';

export default (name) => {
  const queryResult = useStaticQuery(
    graphql`
      query GetAllLimits {
        allLimitsYaml {
          nodes {
            name
            value
          }
        }
      }
    `
  );

  return queryResult.allLimitsYaml.nodes.find((limit) => limit.name === name);
};
