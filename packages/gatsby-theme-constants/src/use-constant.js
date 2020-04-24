import { useStaticQuery, graphql } from 'gatsby';

const useConstant = (type, name) => {
  const queryResult = useStaticQuery(graphql`
    query GetAllDataLimits {
      allConstantsYaml {
        nodes {
          type
          name
          number
          text
        }
      }
    }
  `);
  const matchingConstants = queryResult.allConstantsYaml.nodes.filter(
    (constant) => constant.type === type && constant.name === name
  );
  if (matchingConstants.length > 1) {
    throw new Error(
      `There is more than one constant of type ${type} with name ${name}, please remove the duplicates values.`
    );
  }
  return matchingConstants[0];
};

export default useConstant;
