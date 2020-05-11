import { useStaticQuery, graphql } from 'gatsby';

export const useAllReleaseNotes = () => {
  const queryResult = useStaticQuery(
    graphql`
      query GetAllReleaseNotesForFilters {
        allReleaseNotePage(sort: { order: DESC, fields: date }) {
          nodes {
            date(formatString: "YYYY-MM-DD")
            topics
          }
        }
      }
    `
  );

  return queryResult.allReleaseNotePage.nodes;
};

export const useReleaseNotesTopicsSet = () => {
  const allReleaseNotes = useAllReleaseNotes();

  const topics = new Set();

  allReleaseNotes.forEach((obj) => {
    obj.topics.forEach((topic) => topics.add(topic));
  });

  return Array.from(topics);
};
