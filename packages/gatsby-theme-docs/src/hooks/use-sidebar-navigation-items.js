import { useStaticQuery, graphql } from 'gatsby';

const ancestorsTree = undefined;

const useSidebarNavigationItems = () => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      allNavigationYaml {
        nodes {
          chapterTitle
          path
          pages {
            title
            path
            beta
            pages {
              title
              path
              beta
            }
          }
        }
      }
    }
  `);

  const ancestorsMap = !ancestorsTree
    ? createAncestorsTree(data?.allNavigationYaml?.nodes || [])
    : ancestorsTree;

  return { data, ancestorsMap };
};

function createAncestorsTree(data) {
  const ancestorsArray = [];

  function traverse(chapters, parentPath = [], level = 0) {
    chapters.forEach((chapter, index) => {
      if (chapter.pages) {
        const currentPath = [...parentPath, `${level}-${index}`];
        ancestorsArray.push(currentPath);

        if (chapter.pages.length > 0) {
          const nextLevel = level + 1;
          traverse(chapter.pages, currentPath, nextLevel);
        }
      }
    });
  }

  traverse(data);

  return ancestorsArray;
}

export default useSidebarNavigationItems;
