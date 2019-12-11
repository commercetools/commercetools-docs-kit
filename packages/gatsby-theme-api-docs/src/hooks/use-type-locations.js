/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateTypeURN } from '../utils/ctp-urn';

const convertComponentInMdxToTypeLocations = data => {
  const typeLocations = {};

  data.allComponentInMdx.nodes.forEach(node => {
    const apiKeyAttribute = node.attributes.find(att => att.name === 'apikey');
    const typeAttribute = node.attributes.find(att => att.name === 'type');

    const apiKey = apiKeyAttribute ? apiKeyAttribute.value : null;
    const name = typeAttribute ? typeAttribute.value : null;
    const { slug } = node.page.fields;
    const urn = generateTypeURN({ apiKey, name });
    const urlAnchorTag = slug && urn ? `${slug}#${urn}` : '';

    typeLocations[`${apiKey}__${name}`] = {
      apiKey,
      name,
      slug,
      urn,
      urlAnchorTag,
    };
  });

  return typeLocations;
};

export const useTypeLocations = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allComponentInMdx(filter: { component: { eq: "apitype" } }) {
          nodes {
            attributes {
              name
              value
            }
            page: parent {
              ... on Mdx {
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    `
  );

  return convertComponentInMdxToTypeLocations(queryResult);
};
