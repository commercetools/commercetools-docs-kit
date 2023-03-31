import { useStaticQuery, graphql } from 'gatsby';

export const useCoursePages = () => {
  const coursePagesData = useStaticQuery(
    graphql`
      {
        allContentPage(filter: { courseId: { ne: null } }) {
          nodes {
            slug
            courseId
            topicName
          }
        }
      }
    `
  );

  return coursePagesData.allContentPage.nodes;
};

const coursePageMap = new Map();
var isIndexed = false;
/**
 * Creates a map between page slugs and course ids
 */
const courseMapToPages = (coursePagesData) => {
  if (!isIndexed) {
    coursePagesData.forEach((element) => {
      const { courseId, topicName } = element;
      coursePageMap.set(element.slug, { courseId, topicName });
    });
  }
  isIndexed = true;
};

/**
 * Given an array of page slugs, it returns an array with course info
 * if exists, otherwise undefined
 */
export const useCourseInfoByPageSlugs = (pageSlugs) => {
  courseMapToPages(useCoursePages());
  const courseInfo = pageSlugs.reduce(
    (prev, curr) => ({ ...prev, [curr]: coursePageMap.get(curr) }),
    {}
  );
  // sanity check: all the pages should belong to the same course, therefore have the same courseId
  const isOk = Object.values(courseInfo)?.every(
    (info, _, theArray) => info?.courseId === theArray[0]?.courseId
  );
  if (!isOk) {
    // TODO: decide if we want to make this blocker
    console.warn(
      'pages belonging to the same course have different courseId metadata',
      courseInfo
    );
  }
  return courseInfo;
};
