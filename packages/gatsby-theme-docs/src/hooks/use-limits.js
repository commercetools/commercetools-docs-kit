import { useStaticQuery, graphql } from 'gatsby';

export const useLimits = () => {
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

  return queryResult.allLimitsYaml.nodes;
};

export const useLimitByName = (name) => {
  const limits = useLimits().filter((limit) => limit.name === name);
  if (limits.length > 1) {
    throw new Error(
      `There is more than one limit with name ${name}, please remove duplicates.`
    );
  }
  return limits[0];
};
