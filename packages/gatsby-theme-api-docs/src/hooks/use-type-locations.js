/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateTypeURN } from '../utils/ctp-urn';
import { useTypeLocationOverrides } from './use-type-location-overrides';

var locationsAreIndexed = false;
var overridesAreIndexed = false;
const typeLocations = {};
const typeLocationOverrides = {};

const buildPageSlug = (page) => {
  const [pathWithoutExt] = page.parent.relativePath.split(page.parent.ext);
  return `/${pathWithoutExt}`;
};

const convertComponentInMdxToTypeLocations = (data) => {
  if (!locationsAreIndexed) {
    data.allComponentInMdx.nodes.forEach((node) => {
      const apiKey =
        node.attributes[0].name === 'apiKey' ? node.attributes[0].value : null;
      const name =
        node.attributes[1].name === 'type' ? node.attributes[1].value : null;

      const slug = buildPageSlug(node.page);
      const urn = generateTypeURN({ apiKey, displayName: name });
      const url = slug && urn ? `${slug}#${urn}` : '';

      typeLocations[`${apiKey}__${name}`] = { url };
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
        allComponentInMdx(filter: { component: { eq: "ApiType" } }) {
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
  convertComponentInMdxToTypeLocations(queryResult);
  convertTypeLocationOverrides(useTypeLocationOverrides());
  return { ...typeLocations, ...typeLocationOverrides };
};

export const locationForType = (apiKey, type, typeLocations) => {
  return typeLocations[`${apiKey}__${type}`];
};
