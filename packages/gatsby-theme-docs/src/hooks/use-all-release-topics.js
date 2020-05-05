import { useStaticQuery, graphql } from 'gatsby';

const useAllReleaseTopics = () => {
  const queryResult = useStaticQuery(
    graphql`
      query GetAllReleaseTopics {
        allReleaseNotePage(sort: { order: DESC, fields: date }) {
          nodes {
            topics
          }
        }
      }
    `
  );

  return queryResult.allReleaseNotePage.nodes;
};

export default useAllReleaseTopics;

export const useReleaseNotesTopicsSet = () => {
  const allTopics = useAllReleaseTopics();

  const topics = new Set();

  allTopics.forEach((obj) => {
    obj.topics.forEach((topic) => topics.add(topic));
  });

  return topics;
};
