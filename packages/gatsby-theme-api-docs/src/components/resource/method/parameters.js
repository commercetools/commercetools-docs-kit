import React from 'react';
import PropTypes from 'prop-types';
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
        {parameters.map(parameter => {
          return (
            <tr key={parameter.name}>
              <td>
                <p>
                  <Markdown.InlineCode>{parameter.name}</Markdown.InlineCode>
                  {parameter.required ? <Required>*</Required> : null}
                </p>
                <p>{capitalizeFirst(parameter.type)}</p>
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
