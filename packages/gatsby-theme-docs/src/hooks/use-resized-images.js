import nodeJsPath from 'path';
import { useStaticQuery, graphql } from 'gatsby';

export const useResizedImages = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allImageSharp {
          nodes {
            parent {
              ... on File {
                relativePath
                relativeDirectory
              }
            }
            fluid(maxWidth: 754, srcSetBreakpoints: [754, 1508]) {
              srcSet
              src
              presentationWidth
              presentationHeight
              originalImg
            }
          }
        }
      }
    `
  );
  return queryResult.allImageSharp.nodes.map((node) => {
    return {
      ...node.fluid,
      path: nodeJsPath.join(
        '/images/',
        node.parent.relativeDirectory,
        node.parent.relativePath
      ),
    };
  });
};

export const useResizedImagesByPath = (path = '') => {
  return useResizedImages().find((resizedImage) => {
    return resizedImage.path === path;
  });
};
