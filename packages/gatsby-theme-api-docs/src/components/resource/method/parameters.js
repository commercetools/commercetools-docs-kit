import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import capitalizeFirst from '../../../utils/capitalize-first';
import Required from '../../required';
import Table from '../../table';

const Parameters = ({ title, parameters }) => {
  return (
    <Table>
      {title ? (
        <thead>
          <tr>
            <th colSpan="2">{title}</th>
          </tr>
        </thead>
      ) : null}

      <tbody>
        {parameters.map((parameter) => {
          return (
            <tr key={parameter.name}>
              <td>
                <SpacingsStack scale="xs">
                  <p className="name-type">
                    <Markdown.InlineCode>{parameter.name}</Markdown.InlineCode>
                    {parameter.required ? <Required>*</Required> : null}
                  </p>
                  <p className="name name-type">
                    {capitalizeFirst(parameter.type)}
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
  title: PropTypes.string,
  parameters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Parameters;
