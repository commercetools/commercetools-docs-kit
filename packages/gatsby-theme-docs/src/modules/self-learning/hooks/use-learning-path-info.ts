import { graphql, useStaticQuery } from 'gatsby';
import { CoursePageNode } from './use-course-pages';

const useLearningPathPages = (): {
  allContentPage: {
    nodes: CoursePageNode[];
  };
} => {
  const data = useStaticQuery(
    graphql`
      {
        allContentPage(filter: { learningPathId: { ne: null } }) {
          nodes {
            slug
            courseId
            learningPathId
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

export const useLearningPathsInfo = (
  learningPathTitles: Record<number, { title: string }>
) => {
  const { allContentPage } = useLearningPathPages();
  const learningPaths = allContentPage.nodes.reduce((acc, node) => {
    if (!node.learningPathId) {
      return acc;
    }
    if (!acc[node.learningPathId]) {
      acc[node.learningPathId] = {
        title: learningPathTitles?.[node.learningPathId]?.title,
        courses: [],
      };
    }
    if (
      acc[node.learningPathId].courses.some((c) => c.courseId === node.courseId)
    ) {
      return acc;
    } else {
      acc[node.learningPathId].courses.push({
        courseId: node.courseId,
      });
    }
    return acc;
  }, {} as Record<number, { title: string; courses: { courseId: number }[] }>);
  return learningPaths;
};
