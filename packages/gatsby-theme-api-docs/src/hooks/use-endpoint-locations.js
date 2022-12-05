/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateEndpointURN } from '../utils/ctp-urn';
import { useEndpointLocationOverrides } from './use-endpoint-location-overrides';

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

      endpointLocations[`${apiKey}__${resource}__${method}`] = { url };
    });
  }
  locationsAreIndexed = true;
};

const convertEndpointLocationOverrides = (endpointLocationData) => {
  if (!overridesAreIndexed) {
    endpointLocationData.forEach((api) => {
      api.locations.forEach((location) => {
        endpointLocationOverrides[
          `${api.api}__${location.resource}__${location.method}`
        ] = {
          url: location.href,
        };
      });
    });
  }
  overridesAreIndexed = true;
};

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
  convertEndpointLocationOverrides(useEndpointLocationOverrides());
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
