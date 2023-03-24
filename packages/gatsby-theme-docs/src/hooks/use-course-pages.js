import { useStaticQuery, graphql } from 'gatsby';

export const useCoursePages = () => {
  const coursePagesData = useStaticQuery(
    graphql`
      {
        allContentPage(filter: { courseId: { ne: null } }) {
          nodes {
            slug
            courseId
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
      coursePageMap.set(element.slug, element.courseId);
    });
  }
  isIndexed = true;
};

/**
 * Given a page slug, it returns the courseId where the page belongs
 * if exists, otherwise undefined
 */
export const useCourseIdByPageSlug = (pageSlug) => {
  courseMapToPages(useCoursePages());
  return coursePageMap.get(pageSlug);
};
