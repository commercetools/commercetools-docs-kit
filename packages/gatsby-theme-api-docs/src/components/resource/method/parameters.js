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
import RegexProperty from '../../type/properties/regex-properties';
import Table from '../../table';
import Title from './title';
import { DescriptionText } from '../../description';
import Info from '../../info';
import { typography } from '../../../design-system';

const isRegex = (string) =>
  string.charAt(0) === '/' && string.charAt(string.length - 1) === '/';

const isTypeUnion = (strType) => {
  return typeof strType === 'string' && strType === 'Union';
};

const getParameterType = ({ name, unionParams }, type, apiKey) => {
  if (isRegex(name)) {
    return `Any ${type.toLowerCase()} parameter matching this regular expression`;
  }
  if (isTypeUnion(type)) {
    return <UnionParametersRow types={unionParams} apiKey={apiKey} />;
  }
  return type;
};

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const PropertyName = styled.div`
  display: inline-block;
  margin-right: ${uiKitDesignSystem.dimensions.spacings.s};
  white-space: nowrap;
  line-height: ${typography.lineHeights.propertyType};
`;
const PropertyType = styled.div`
  display: inline-block;
  line-height: ${typography.lineHeights.propertyType};
  color: ${uiKitDesignSystem.colors.light.textFaded};
`;

const Parameters = (props) => {
  return (
    <SpacingsStack scale="xs">
      {props.title && <Title>{props.title}:</Title>}
      <Table>
        <tbody>
          {props.parameters.map((parameter) => {
            return (
              <ParameterRow
                key={parameter.name}
                apiKey={props.apiKey}
                parameter={parameter}
              />
            );
          })}
        </tbody>
      </Table>
    </SpacingsStack>
  );
};
Parameters.propTypes = {
  apiKey: PropTypes.string,
  title: PropTypes.string,
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
      description: PropTypes.string,
      items: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired
  ).isRequired,
};
Parameters.displayName = 'Parameters';

function UnionParametersRow(props) {
  const typesToRender = useTypesToRender({
    property: props.types,
    apiKey: props.apiKey,
    isParameter: true,
  });

  return (
    <>
      Can be{' '}
      {typesToRender.map(({ type }, idx, { length }) =>
        length > idx + 1 ? (
          <span key={idx}>{type}, </span>
        ) : (
          <span key={idx}>or {type}</span>
        )
      )}
    </>
  );
}

UnionParametersRow.propTypes = {
  apiKey: PropTypes.string.isRequired,
  types: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    description: PropTypes.string,
    additionalDescription: PropTypes.string,
    items: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
};
UnionParametersRow.displayName = 'UnionParametersRow';

function ParameterRow(props) {
  const typesToRender = useTypesToRender({
    property: props.parameter,
    apiKey: props.apiKey,
    isParameter: true,
  });
  const typeToRender = typesToRender[0]; // safe as we expect a single item in the array

  return (
    <tr key={props.parameter.name}>
      <td>
        <PropertyName>
          <SpacingsInline scale="xs">
            {isRegex(props.parameter.name) ? (
              <RegexProperty expression={props.parameter.name} />
            ) : (
              <Markdown.InlineCode>{props.parameter.name}</Markdown.InlineCode>
            )}
            {props.parameter.required && <Required />}
          </SpacingsInline>
        </PropertyName>
        {'\u200B' /* zero-width space for the search crawler */}
        <PropertyType>
          {typeToRender.displayPrefix && typeToRender.displayPrefix}

          {getParameterType(props.parameter, typeToRender.type, props.apiKey)}
        </PropertyType>
        {'\u200B' /* zero-width space for the search crawler */}
      </td>
      <td>
        <SpacingsStack scale="xs">
          {props.parameter.description && (
            <DescriptionText markdownString={props.parameter.description} />
          )}
          {props.parameter.additionalDescription && (
            <div>
              <Info>{props.parameter.additionalDescription}</Info>
            </div>
          )}
        </SpacingsStack>
      </td>
    </tr>
  );
}
ParameterRow.propTypes = {
  apiKey: PropTypes.string,
  parameter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    description: PropTypes.string,
    additionalDescription: PropTypes.string,
    items: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
};
ParameterRow.displayName = 'ParameterRow';

export default Parameters;
