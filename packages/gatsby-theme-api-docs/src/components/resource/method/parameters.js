import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Markdown,
  designSystem as uiKitDesignSystem,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import useTypeToRender from '../../../hooks/use-type-to-render';
import Required from '../../required';
import Table from '../../table';
import Title from './title';
import { DescriptionText } from '../../description';
import Info from '../../info';

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const PropertyName = styled.div`
  display: inline-block;
  margin-right: ${uiKitDesignSystem.dimensions.spacings.s};
  white-space: nowrap;
`;
const PropertyType = styled.div`
  display: inline-block;
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

function ParameterRow(props) {
  const typeToRender = useTypeToRender({
    property: props.parameter,
    apiKey: props.apiKey,
    isParameter: true,
  });
  return (
    <tr key={props.parameter.name}>
      <td>
        <PropertyName className="name-type">
          <Markdown.InlineCode>{props.parameter.name}</Markdown.InlineCode>
          {props.parameter.required && <Required />}
        </PropertyName>
        <PropertyType className="name name-type">
          {typeToRender.displayPrefix && (
            <span className="name">{typeToRender.displayPrefix}</span>
          )}

          {typeof typeToRender.type === 'string' ? (
            <span className="name">{typeToRender.type}</span>
          ) : (
            typeToRender.type
          )}
        </PropertyType>
      </td>
      <td>
        <SpacingsStack scale="xs">
          {props.parameter.description ? (
            <DescriptionText markdownString={props.parameter.description} />
          ) : (
            '-'
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
