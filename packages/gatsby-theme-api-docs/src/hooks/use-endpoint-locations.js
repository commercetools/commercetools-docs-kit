/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateEndpointURN } from '../utils/ctp-urn';
import { useTypeLocationOverrides } from './use-type-location-overrides';

var locationsAreIndexed = false;
var overridesAreIndexed = false;
const endpointLocations = {};
const endpointLocationOverrides = {};

const buildPageSlug = (page) => {
  const [pathWithoutExt] = page.parent.relativePath.split(page.parent.ext);
  return `/${pathWithoutExt}`;
};

const convertComponentInMdxToEndpointLocations = (data) => {
  if (!locationsAreIndexed) {
    data.allComponentInMdx.nodes.forEach((node) => {
      const apiKey =
        node.attributes[0].name === 'apiKey' ? node.attributes[0].value : null;
      const resource =
        node.attributes[1].name === 'resource'
          ? node.attributes[1].value
          : null;
      const method =
        node.attributes[2].name === 'method' ? node.attributes[2].value : null;

      const slug = buildPageSlug(node.page);
      const urn = generateEndpointURN({ apiKey, method, path: resource });
      const url = slug && urn ? `${slug}#${urn}` : '';

      console.log('adding', `${apiKey}__${resource}__${method}`, url);
      endpointLocations[`${apiKey}__${resource}__${method}`] = { url };
    });
  }
  locationsAreIndexed = true;
};

// const convertTypeLocationOverrides = (typeLocationData) => {
//   if (!overridesAreIndexed) {
//     typeLocationData.forEach((api) => {
//       api.locations.forEach((location) => {
//         typeLocationOverrides[`${api.api}__${location.type}`] = {
//           url: location.href,
//         };
//       });
//     });
//   }
//   overridesAreIndexed = true;
// };

export const useEndpointLocations = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allComponentInMdx(filter: { component: { eq: "ApiEndpoint" } }) {
          nodes {
            attributes {
              name
              value
            }
            page: mdx {
              parent {
                id
                ... on File {
                  relativePath
                  ext
                }
              }
            }
          }
        }
      }
    `
  );
  convertComponentInMdxToEndpointLocations(queryResult);
  // convertTypeLocationOverrides(useTypeLocationOverrides());
  return { ...endpointLocations, ...endpointLocationOverrides };
};

export const locationForEndpoint = (
  apiKey,
  resource,
  method,
  endpointLocations
) => {
  return endpointLocations[`${apiKey}__${resource}__${method}`];
};
