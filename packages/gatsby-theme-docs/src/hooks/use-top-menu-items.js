import { useStaticQuery, graphql } from 'gatsby';

function removeNullUndefined(obj) {
  if (Array.isArray(obj)) {
    var newArr = [];
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] !== null && obj[i] !== undefined) {
        if (typeof obj[i] === 'object') {
          newArr.push(removeNullUndefined(obj[i])); // Recursively check objects in arrays
        } else {
          newArr.push(obj[i]);
        }
      }
    }
    return newArr;
  } else if (typeof obj === 'object') {
    var newObj = {};
    for (var prop in obj) {
      if (obj[prop] !== null && obj[prop] !== undefined) {
        if (typeof obj[prop] === 'object') {
          newObj[prop] = removeNullUndefined(obj[prop]); // Recursively check nested objects
        } else {
          newObj[prop] = obj[prop];
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

let topMenuItems = undefined;

const useTopMenuItems = () => {
  const data = useStaticQuery(graphql`
    query GetTopMenuItems {
      allTopMenuYaml {
        nodes {
          footerTitle
          menuTitle
          href
          icon
          items {
            title
            beta
            href
            label
            items {
              href
              label
              title
              beta
              items {
                beta
                href
                label
                title
              }
            }
          }
        }
      }
    }
  `);

  topMenuItems = !topMenuItems
    ? removeNullUndefined(data?.allTopMenuYaml.nodes)
    : topMenuItems;

  const siteContextMap = new Map();
  data.allTopMenuYaml.nodes.forEach((node) => {
    node?.items?.forEach((item) => {
      if (item?.href?.startsWith('/../')) {
        const minisiteSegment = item.href.split('/')[2];
        if (minisiteSegment) {
          siteContextMap.set(minisiteSegment, node.menuTitle);
        }
      }
    });
  });

  return { topMenuItems, siteContextMap };
};

export default useTopMenuItems;
