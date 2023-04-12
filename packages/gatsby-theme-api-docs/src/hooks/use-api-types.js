// since in gatsby component-level queries have to be static (i.e. cannot dynamically take variables)
// we have to load a bigger chunk of data statically on a granularity that is OK to provide as an explicit
// component.
// The situation is discussed in length here:  https://github.com/gatsbyjs/gatsby/issues/9047

// This is a React hook as described in https://www.gatsbyjs.org/docs/use-static-query/
import { useStaticQuery, graphql } from 'gatsby';

export const useApiTypes = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allRamlType {
          nodes {
            apiKey
            builtinType
            constant
            description
            discriminator
            discriminatorValue
            displayName
            enumDescriptions {
              name
              description
            }
            enumGroups {
              name
              description
            }
            enumeration
            examples {
              name
              displayName
              description
              value
            }
            oneOf
            properties {
              beta
              builtinType
              constant
              default
              deprecated
              description
              discriminatorValue
              enumeration
              inherited
              items {
                type
              }
              maxItems
              maxLength
              maximum
              minItems
              minLength
              minimum
              name
              pattern
              required
              type
              uniqueItems
            }
            refersTo
            type
          }
        }
      }
    `
  );

  return queryResult.allRamlType.nodes;
};

// A static property key based index for fast access in large APIs
const byKeyAndDisplayNameIndex = {};
var isIndexed = false;
const index = (apiTypes) => {
  if (!isIndexed) {
    apiTypes.forEach((apiType) => {
      byKeyAndDisplayNameIndex[apiType.apiKey + '__' + apiType.displayName] =
        apiType;
    });
  }
  isIndexed = true;
};

export const useApiTypeByApiKeyAndDisplayName = (
  apiKey = '',
  apiTypeDisplayName = ''
) => {
  index(useApiTypes());
  return byKeyAndDisplayNameIndex[apiKey + '__' + apiTypeDisplayName];
};
