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
      path: ['/images', node.parent.relativePath].join('/'),
    };
  });
};

export const useResizedImagesByPath = (path) => {
  const allResizedImages = useResizedImages();
  return allResizedImages.find((resizedImage) => resizedImage.path === path);
};
