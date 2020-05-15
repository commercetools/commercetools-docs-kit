import { useStaticQuery, graphql } from 'gatsby';

const useReleaseNotesTopics = (selectedTopics = []) => {
  const data = useStaticQuery(graphql`
    query GetAllReleaseNotesTopics {
      allReleaseNotePage(sort: { order: DESC, fields: date }) {
        nodes {
          topics
        }
      }
    }
  `);

  // Convert to a Set first to remove duplicates
  const topics = new Set();
  data.allReleaseNotePage.nodes.forEach((node) => {
    node.topics.forEach((topic) => {
      topics.add(topic);
    });
  });
  return Array.from(topics).reduce((allTopics, topic) => {
    const isChecked = selectedTopics.includes(topic);
    return [
      ...allTopics,
      {
        name: topic,
        checked: isChecked,
      },
    ];
  }, []);
};

export default useReleaseNotesTopics;
