import { useStaticQuery, graphql } from 'gatsby';

const SidebarNavigationItems = () => {
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
  return data;
};

export default SidebarNavigationItems;
