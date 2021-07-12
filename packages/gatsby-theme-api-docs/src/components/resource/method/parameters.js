import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Markdown,
  designSystem as uiKitDesignSystem,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import generateTypeToRender from '../../../utils/generate-type-to-render';
import Required from '../../required';
import Table from '../../table';
import Title from './title';
import Description from '../../description';

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

function ParameterRow(props) {
  const typeLocations = useTypeLocations();
  const typeToRender = generateTypeToRender({
    typeLocations,
    property: props.parameter,
    apiKey: props.apiKey,
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
        {props.parameter.description ? (
          <Description>{props.parameter.description}</Description>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
}

ParameterRow.propTypes = {
  apiKey: PropTypes.string,
  parameter: PropTypes.object.isRequired,
};

Parameters.propTypes = {
  apiKey: PropTypes.string,
  title: PropTypes.string,
  parameters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Parameters;
