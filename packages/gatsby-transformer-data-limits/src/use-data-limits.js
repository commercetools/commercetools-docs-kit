import { useStaticQuery, graphql } from 'gatsby';

export const useDataLimits = () => {
  const queryResult = useStaticQuery(graphql`
    query GetAllDataLimits {
      allDataLimitsYaml {
        nodes {
          name
          number
          text
        }
      }
    }
  `);

  return queryResult.allDataLimitsYaml.nodes;
};

export const useDataLimitByName = (name) => {
  const allDataLimits = useDataLimits();
  const matchingDataLimits = allDataLimits.filter(
    (limit) => limit.name === name
  );
  if (matchingDataLimits.length > 1) {
    throw new Error(
      `There is more than one limit with name ${name}, please remove duplicates.`
    );
  }
  return matchingDataLimits[0];
};
