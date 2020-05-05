import { useStaticQuery, graphql } from 'gatsby';

export default () => {
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
