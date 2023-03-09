import { useStaticQuery, graphql } from 'gatsby';

const UseCodeExamples = () => {
  const queryResult = useStaticQuery(graphql`
    query GetAllCodeExamplesQuery {
      allCodeExample {
        nodes {
          name
          language
          path
          content
        }
      }
    }
  `);
  return queryResult.allCodeExample.nodes;
};

export default UseCodeExamples;
