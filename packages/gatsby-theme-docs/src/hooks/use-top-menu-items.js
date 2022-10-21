import { useStaticQuery, graphql } from 'gatsby';

const useTopMenuItems = () => {
  const data = useStaticQuery(graphql`
    query GetTopMenuItems {
      allTopMenuYaml {
        nodes {
          menuTitle
          items {
            href
          }
        }
      }
    }
  `);

  const siteContextMap = new Map();
  data.allTopMenuYaml.nodes.forEach((node) => {
    node.items.forEach((item) => {
      if (item.href.startsWith('/../')) {
        const minisiteSegment = item.href.split('/')[2];
        if (minisiteSegment) {
          siteContextMap.set(minisiteSegment, node.menuTitle);
        }
      }
    });
  });

  return siteContextMap;
};

export default useTopMenuItems;
