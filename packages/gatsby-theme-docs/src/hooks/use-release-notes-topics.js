import { useStaticQuery, graphql } from 'gatsby';

const useReleaseNotesTopics = (selectedTopics = []) => {
  const data = useStaticQuery(graphql`
    query GetAllReleaseNotesTopics {
      allReleaseNoteTopics: allMdx(
        sort: { fields: fields___topics, order: ASC }
        filter: { fields: { pageType: { eq: "ReleaseNote" } } }
      ) {
        group(field: fields___topics) {
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
