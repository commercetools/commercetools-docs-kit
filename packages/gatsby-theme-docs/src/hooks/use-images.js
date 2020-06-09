import { useStaticQuery, graphql } from 'gatsby';

export const useImages = () => {
  const data = useStaticQuery(graphql`
    query GetAllImages {
      allFile {
        nodes {
          childImageSharp {
            fluid(maxWidth: 770) {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);
  return data.allFile.nodes;
};

export const useImagesByName = (imageName = '') => {
  const allImages = useImages();

  return allImages.find((image) => {
    return image.childImageSharp
      ? image.childImageSharp.fluid.originalName === imageName
      : false;
  });
};
