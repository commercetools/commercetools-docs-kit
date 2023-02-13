/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateEndpointURN } from '../utils/ctp-urn';
import { useEndpointLocationOverrides } from './use-endpoint-location-overrides';

var locationsAreIndexed = false;
var overridesAreIndexed = false;
const endpointLocations = {};
const endpointLocationOverrides = {};

const convertComponentInMdxToEndpointLocations = (data) => {
  if (!locationsAreIndexed) {
    data.allContentPage.nodes.forEach((node) => {
      node.shortcodeOccurrence.forEach((occurrence) => {
        if (occurrence.component !== 'ApiEndpoint') {
          return;
        }
        const key = occurrence.attributes.find(
          (attribute) => attribute.name === 'apiKey'
        ).value;
        const resource = occurrence.attributes.find(
          (attribute) => attribute.name === 'resource'
        ).value;
        const method = occurrence.attributes.find(
          (attribute) => attribute.name === 'method'
        ).value;
        const urn = generateEndpointURN({
          apiKey: key,
          method,
          path: resource,
        });
        const url = node.slug && urn ? `${node.slug}#${urn}` : '';
        endpointLocations[`${key}__${resource}__${method}`] = { url };
      });
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
        allContentPage(
          filter: {
            shortcodeOccurrence: {
              elemMatch: { component: { eq: "ApiEndpoint" } }
            }
          }
        ) {
          nodes {
            slug
            shortcodeOccurrence {
              component
              attributes {
                name
                value
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
