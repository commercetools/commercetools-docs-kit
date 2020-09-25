import { useStaticQuery, graphql } from 'gatsby';

export const useResizedImages = () => {
  const queryResult = useStaticQuery(graphql`
    query GetAllReleaseNotesImages {
      allFile(filter: { sourceInstanceName: { eq: "imagesReleases" } }) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 754, srcSetBreakpoints: [754, 1508]) {
              srcSet
              src
              presentationWidth
              presentationHeight
              originalImg
              aspectRatio
            }
          }
        }
      }
    }
  `);
  return queryResult.allFile.nodes.map((node) => {
    return {
      ...node.childImageSharp.fluid,
      relativeImagePath: ['/images/releases', node.relativePath].join('/'),
    };
  });
};

export const useResizedImagesByPath = (imageSrcPath) => {
  const allResizedImages = useResizedImages();
  return allResizedImages.find(
    (resizedImage) => resizedImage.relativeImagePath === imageSrcPath
  );
};
