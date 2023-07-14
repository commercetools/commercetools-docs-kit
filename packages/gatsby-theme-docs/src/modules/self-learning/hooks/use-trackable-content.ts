import { useStaticQuery, graphql } from 'gatsby';

type TrackableContentAttribute = {
  name: string;
  value: string;
};

type TrackableContentFileInfo = {
  file: {
    relativePath: string;
  };
  frontmatter: {
    courseId: number;
    topicName: string;
  };
};
type TrackableContentNode = {
  component: 'Quiz' | 'Video';
  attributes: TrackableContentAttribute[];
  mdx: TrackableContentFileInfo;
};

type TrackableContentQueryResult = {
  allComponentInMdx: { nodes: TrackableContentNode[] };
};

let trackableContentMap = new Map<string, MapContentItem[]>();
var isIndexed = false;

const createTrackableContentMap = (data: TrackableContentQueryResult) => {
  if (!isIndexed) {
    trackableContentMap = new Map(
      Object.entries(
        data.allComponentInMdx.nodes.reduce(
          (
            result: Record<string, MapContentItem[]>,
            item: TrackableContentNode
          ) => {
            const relativePath = item.mdx.file.relativePath;
            if (!result[relativePath]) {
              result[relativePath] = [];
            }
            const courseId = item.mdx.frontmatter.courseId;
            const topicName = item.mdx.frontmatter.topicName;
            const component = item.component;
            result[relativePath].push({
              component: { type: component, attributes: item.attributes },
              courseId,
              topicName,
            });
            return result;
          },
          {}
        )
      )
    );

    isIndexed = true;
  }
};

const useTrackableContent = (): Map<string, MapContentItem[]> => {
  const data = useStaticQuery(
    graphql`
      {
        allComponentInMdx(filter: { component: { in: ["Video", "Quiz"] } }) {
          nodes {
            component
            attributes {
              name
              value
            }
            mdx {
              file: parent {
                ... on File {
                  relativePath
                }
              }
              frontmatter {
                courseId
                topicName
              }
            }
          }
        }
      }
    `
  );
  createTrackableContentMap(data);
  return trackableContentMap;
};

export type MapContentItem = {
  component: {
    type: 'Quiz' | 'Video';
    attributes: TrackableContentAttribute[];
  };
  courseId: number;
  topicName: string;
};

const slugToRelativeFilePath = (slug: string) => {
  const path = slug.startsWith('/') ? slug.substring(1) : slug;
  return `${path}.mdx`;
};

export const useTrackableContentByPageSlug = (pageSlug: string) => {
  const contentMap = useTrackableContent();
  return contentMap.get(slugToRelativeFilePath(pageSlug));
};
