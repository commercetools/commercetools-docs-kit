import { useStaticQuery, graphql } from 'gatsby';

const useAllReleaseTopics = () => {
  const queryResult = useStaticQuery(
    graphql`
      query GetAllReleaseTopics {
        allReleaseNotePage {
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

  return Array.from(topics);
};
