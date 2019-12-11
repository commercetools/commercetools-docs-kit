/* eslint-disable import/prefer-default-export */
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
            name
            key
            description
            additionalProperties
            discriminator
            discriminatorValue
            apiKey
            type
            originalType
            library
            constant
            unionLike
            enumeration
            properties {
              beta
              deprecated
              enumDescriptions {
                name
                description
              }
              constant
              library
              name
              description
              type
              originalType
              default
              minLength
              maxLength
              uniqueItems
              enumeration
              minimum
              maximum
              pattern
              items {
                type
                originalType
              }
              minItems
              maxItems
              anyOf {
                type
                name
              }
              required
            }
            examples {
              name
              value
            }
          }
        }
      }
    `
  );

  return queryResult.allRamlType.nodes;
};
