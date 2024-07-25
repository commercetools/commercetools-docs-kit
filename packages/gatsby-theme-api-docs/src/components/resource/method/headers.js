import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Markdown,
  designSystem as uiKitDesignSystem,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import useTypesToRender from '../../../hooks/use-type-to-render';
import Required from '../../required';
import Table from '../../table';
import Title from './title';
import { DescriptionText } from '../../description';
import Info from '../../info';
import { typography } from '../../../design-system';

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const HeaderName = styled.div`
  display: inline-block;
  margin-right: ${uiKitDesignSystem.dimensions.spacings.s};
  white-space: nowrap;
  line-height: ${typography.lineHeights.propertyType};
`;
const HeaderType = styled.div`
  display: inline-block;
  line-height: ${typography.lineHeights.propertyType};
  color: ${uiKitDesignSystem.colors.light.textFaded};
`;

const Pattern = styled.code`
  color: ${uiKitDesignSystem.colors.light.textHighlight};
  letter-spacing: 0.03em;
`;

const Headers = (props) => {
  return (
    <SpacingsStack scale="xs">
      {props.title && <Title>{props.title}:</Title>}
      <Table>
        <tbody>
          {props.headers.map((header) => {
            return (
              <HeaderRow
                key={header.name}
                apiKey={props.apiKey}
                header={header}
              />
            );
          })}
        </tbody>
      </Table>
    </SpacingsStack>
  );
};
Headers.propTypes = {
  apiKey: PropTypes.string,
  title: PropTypes.string,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string,
      required: PropTypes.bool,
      pattern: PropTypes.string,
      enum: PropTypes.string,
    }).isRequired
  ).isRequired,
};
Headers.displayName = 'Headers';

function HeaderRow(props) {
  const typesToRender = useTypesToRender({
    property: props.header,
    apiKey: props.apiKey,
    isParameter: false,
  });
  const typeToRender = typesToRender[0]; // safe as we expect a single item in the array

  return (
    <tr key={props.header.displayName}>
      <td>
        <HeaderName>
          <SpacingsInline scale="xs">
            <Markdown.InlineCode>{props.header.header}</Markdown.InlineCode>
            {props.header.required && <Required />}
          </SpacingsInline>
        </HeaderName>
        {'\u200B' /* zero-width space for the search crawler */}
        <HeaderType>
          {typeToRender.displayPrefix && typeToRender.displayPrefix}

          {typeToRender.type}
        </HeaderType>
        {'\u200B' /* zero-width space for the search crawler */}
      </td>
      <td>
        <SpacingsStack scale="xs">
          {props.header.description && (
            <DescriptionText markdownString={props.header.description} />
          )}
          {props.header.pattern && (
            <div>
              <Info>
                Pattern: <Pattern>{props.header.pattern}</Pattern>
              </Info>
            </div>
          )}
        </SpacingsStack>
      </td>
    </tr>
  );
}
HeaderRow.propTypes = {
  apiKey: PropTypes.string,
  header: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    pattern: PropTypes.string,
    enum: PropTypes.string,
  }).isRequired,
};
HeaderRow.displayName = 'HeaderRow';

export default Headers;
