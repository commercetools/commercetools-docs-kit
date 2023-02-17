import { useStaticQuery, graphql } from 'gatsby';

const useReleaseNotesTopics = (selectedTopics = []) => {
  const data = useStaticQuery(graphql`
    query GetAllReleaseNotesTopics {
      allReleaseNoteTopics: allReleaseNotePage(
        sort: { fields: topics, order: ASC }
      ) {
        group(field: topics) {
          fieldValue
        }
      }
    }
  `);
  return data.allReleaseNoteTopics.group.map((topic) => ({
    name: topic.fieldValue,
    checked: selectedTopics.includes(topic.fieldValue),
  }));
};

export default useReleaseNotesTopics;
