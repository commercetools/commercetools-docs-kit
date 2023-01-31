/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateTypeURN } from '../utils/ctp-urn';
import { useTypeLocationOverrides } from './use-type-location-overrides';

var locationsAreIndexed = false;
var overridesAreIndexed = false;
const typeLocations = {};
const typeLocationOverrides = {};

const convertComponentInMdxToTypeLocations = (data) => {
  if (!locationsAreIndexed) {
    data.allContentPage.nodes.forEach((node) => {
      node.shortcodeOccurrence.forEach((occurrence) => {
        if (occurrence.component !== 'ApiType') {
          return;
        }
        const apiKey = occurrence.attributes.find(
          (attribute) => attribute.name === 'apiKey'
        ).value;
        const name = occurrence.attributes.find(
          (attribute) => attribute.name === 'type'
        ).value;

        const urn = generateTypeURN({ apiKey, displayName: name });
        const url = node.slug && urn ? `${node.slug}#${urn}` : '';
        typeLocations[`${apiKey}__${name}`] = { url };
      });
    });
  }
  locationsAreIndexed = true;
};

const convertTypeLocationOverrides = (typeLocationData) => {
  if (!overridesAreIndexed) {
    typeLocationData.forEach((api) => {
      api.locations.forEach((location) => {
        typeLocationOverrides[`${api.api}__${location.type}`] = {
          url: location.href,
        };
      });
    });
  }
  overridesAreIndexed = true;
};

export const useTypeLocations = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allContentPage(
          filter: {
            shortcodeOccurrence: { elemMatch: { component: { eq: "ApiType" } } }
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
  convertComponentInMdxToTypeLocations(queryResult);
  convertTypeLocationOverrides(useTypeLocationOverrides());
  return { ...typeLocations, ...typeLocationOverrides };
};

export const locationForType = (apiKey, type, typeLocations) => {
  return typeLocations[`${apiKey}__${type}`];
};
