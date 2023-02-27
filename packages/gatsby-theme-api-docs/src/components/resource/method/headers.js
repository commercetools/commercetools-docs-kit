import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  Markdown,
  designSystem,
  markdownFragmentToReact,
} from '@commercetools-docs/ui-kit';
import { Link as GatsbyLink } from '@commercetools-docs/gatsby-theme-docs';
import transformURNLinksPlugin from '../../../utils/transform-urn-links-plugin';
import capitalizeFirst from '../../../utils/capitalize-first';
import { typography } from '../../../design-system';
import { Info, InfoValue } from '../../info';
import Required from '../../required';
import Table from '../../table';
import Title from './title';

const PropertyName = styled.div`
  white-space: nowrap;
  line-height: ${typography.lineHeights.propertyType};
`;
const PropertyType = styled.div`
  line-height: ${typography.lineHeights.propertyType};
  color: ${designSystem.colors.light.textFaded};
`;

const DescriptionTextContainer = styled.span`
  display: inline-block;
`;

const Headers = (props) => {
  console.log(props.headers);
  return (
    <SpacingsStack scale="xs">
      {props.title && <Title>{props.title}:</Title>}
      <Table>
        <tbody>
          {props.headers.map((header, headerIndex) => {
            return (
              <tr key={headerIndex}>
                <td>
                  <SpacingsStack scale="xs">
                    <PropertyName>
                      <SpacingsInline scale="xs">
                        <Markdown.InlineCode>
                          {header.displayName
                            ? header.displayName
                            : header.header}
                        </Markdown.InlineCode>
                        {'\u200B' /* zero-width space for the search crawler */}
                        {header.required && <Required />}
                      </SpacingsInline>
                    </PropertyName>
                    <PropertyType>
                      {capitalizeFirst(header.type)}
                      {'\u200B' /* zero-width space for the search crawler */}
                    </PropertyType>
                  </SpacingsStack>
                </td>
                <td>
                  <SpacingsStack scale="xs">
                    <DescriptionTextContainer data-search-key="embedded-api-description">
                      {markdownFragmentToReact(
                        header.description,
                        { a: GatsbyLink },
                        transformURNLinksPlugin
                      )}
                    </DescriptionTextContainer>
                    <SpacingsInline>
                      {header.pattern && (
                        <Info>
                          Pattern<InfoValue>{header.pattern}</InfoValue>
                        </Info>
                      )}
                    </SpacingsInline>
                  </SpacingsStack>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </SpacingsStack>
  );
};

Headers.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      displayName: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
      required: PropTypes.bool,
      pattern: PropTypes.string,
    })
  ).isRequired,
};

export default Headers;
