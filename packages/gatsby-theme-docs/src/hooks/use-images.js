import { useStaticQuery, graphql } from 'gatsby';

export const useImages = () => {
  const data = useStaticQuery(graphql`
    query GetAllImages {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          relativePath
          publicURL
        }
      }
    }
  `);
  return data.allFile.nodes;
};

export const useImagesByRelativePath = (path = '') => {
  const images = useImages();
  return images.find((image) => path === `/images/${image.relativePath}`);
};
