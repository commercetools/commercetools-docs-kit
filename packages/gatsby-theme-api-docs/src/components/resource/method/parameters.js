import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import generateTypeToRender from '../../../utils/generate-type-to-render';
import Required from '../../required';
import Table from '../../table';

const Parameters = (props) => {
  const typeLocations = useTypeLocations();

  return (
    <Table>
      {props.title ? (
        <thead>
          <tr>
            <th colSpan="2">{props.title}</th>
          </tr>
        </thead>
      ) : null}

      <tbody>
        {props.parameters.map((parameter) => {
          const typeToRender = generateTypeToRender({
            typeLocations,
            property: parameter,
            apiKey: props.apiKey,
          });

          return (
            <tr key={parameter.name}>
              <td>
                <SpacingsStack scale="xs">
                  <p className="name-type">
                    <Markdown.InlineCode>{parameter.name}</Markdown.InlineCode>
                    {parameter.required ? <Required>*</Required> : null}
                  </p>
                  <p className="name name-type">
                    {typeToRender.displayPrefix && (
                      <span className="name">{typeToRender.displayPrefix}</span>
                    )}

                    {typeof typeToRender.type === 'string' ? (
                      <span className="name">{typeToRender.type}</span>
                    ) : (
                      typeToRender.type
                    )}
                  </p>
                </SpacingsStack>
              </td>
              <td>{parameter.description ? parameter.description : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

Parameters.propTypes = {
  apiKey: PropTypes.string,
  title: PropTypes.string,
  parameters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Parameters;
