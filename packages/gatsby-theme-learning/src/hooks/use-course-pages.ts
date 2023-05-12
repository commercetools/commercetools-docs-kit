import { useStaticQuery, graphql } from 'gatsby';
import {
  useFetchCourses,
  getCourseStatusByCourseId,
} from './use-course-status';
import { useEffect, useState } from 'react';

type CoursePageNode = {
  slug: string;
  courseId: number;
  topicName: string;
};

type NavigationPageNode = {
  title: string;
  path: string;
};

type NavigationNode = {
  chapterTitle: string;
  pages: NavigationPageNode[];
};

export const useCoursePages = (): {
  allContentPage: {
    nodes: CoursePageNode[];
  };
  allNavigationYaml: {
    nodes: NavigationNode[];
  };
} => {
  const data = useStaticQuery(
    graphql`
      {
        allContentPage(filter: { courseId: { ne: null } }) {
          nodes {
            slug
            courseId
            topicName
          }
        }
        allNavigationYaml {
          nodes {
            chapterTitle
            pages {
              title
              path
            }
          }
        }
      }
    `
  );
  return data;
};

const coursePageMap = new Map<
  string,
  { courseId: number; topicName: string }
>();
var isIndexed = false;
/**
 * Creates a map between page slugs and course ids
 */
const courseMapToPages = (data: {
  allContentPage: {
    nodes: CoursePageNode[];
  };
  allNavigationYaml: {
    nodes: NavigationNode[];
  };
}) => {
  if (!isIndexed) {
    data.allContentPage.nodes.forEach((element) => {
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
export const useCourseInfoByPageSlugs = (
  pageSlugs: string[]
): Record<string, { courseId: number; topicName: string }> => {
  courseMapToPages(useCoursePages());
  const courseInfo = pageSlugs.reduce(
    (prev, curr) => ({ ...prev, [curr]: coursePageMap.get(curr) }),
    {}
  );
  return courseInfo;
};

export type OrderedCoursesInfo = {
  courseId: number;
  pages: NavigationPageNode[];
  status: string;
};

/**
 * Returns an array of objects matching the course order defined in the navigation.
 * Each object has 3 properties: courseId, pages (the list of topics pages with the same order as
 * defined in navigation.yaml) and status
 */
export const useOrderedCoursesInfo = (): OrderedCoursesInfo[] | undefined => {
  const coursePageData = useCoursePages();
  const { data, isLoading } = useFetchCourses();
  const [orderedCoursesInfo, setOrderedCourseInfo] = useState<
    OrderedCoursesInfo[] | undefined
  >();
  courseMapToPages(coursePageData);
  const navigationData = coursePageData.allNavigationYaml;
  const coursesOnlyNavData = navigationData.nodes.filter((navElement) => {
    return navElement.pages.find((navElementPage) =>
      coursePageMap.has(navElementPage.path)
    );
  });
  useEffect(() => {
    if (!isLoading && data) {
      setOrderedCourseInfo(
        coursesOnlyNavData.map((navData) => {
          const firstPageSlug = navData.pages[0].path;
          const courseId = coursePageMap.get(firstPageSlug)?.courseId || 0;
          return {
            courseId,
            pages: navData.pages,
            status: getCourseStatusByCourseId(
              data.result.enrolledCourses,
              courseId
            ),
          };
        })
      );
    }
  }, [data, isLoading, coursesOnlyNavData]);

  return orderedCoursesInfo;
};
