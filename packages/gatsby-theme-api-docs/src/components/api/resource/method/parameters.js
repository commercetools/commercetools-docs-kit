import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Markdown } from '@commercetools-docs/gatsby-theme-docs';
import capitalizeFirst from '../../../../utils/capitalize-first';
import { Table, Th, Td } from '../../../elements';

const tableStyle = css`
  border: 0.0625rem solid #e6e6e6;
  border-radius: 0.375rem;
  background-color: #fff;
  box-shadow: 0 0.0625rem 0.0625rem 0 rgba(0, 0, 0, 0.25);
  border-collapse: separate;
  border-spacing: 0;
`;

const thStyle = css`
  border: none;
  border-radius: 0.375rem 0.375rem 0 0;
  background-color: #f2f2f2;
  padding: 0.375rem 0.5rem;
  font-weight: 700;
`;

const tbodyStyle = css`
  tr:not(:first-of-type) {
    border-top: 1px solid #e6e6e6;
  }

  td:first-of-type {
    padding-left: 1rem;
  }

  td:last-of-type {
    padding-right: 1rem;
  }
`;

const tdStyle = css`
  border-top: none;
  padding: 0.5rem;
`;

const nameColStyle = css`
  ${tdStyle};
  width: 15rem;
`;

const separatorColStyle = css`
  ${tdStyle};
  width: 2rem;
`;

const Required = styled.span`
  color: #f16d0e;
  font-size: 1rem;
`;

const Parameters = ({ title, parameters }) => {
  return (
    <div>
      <Table css={tableStyle}>
        {title ? (
          <thead>
            <tr>
              <Th colSpan="3" css={thStyle}>
                {title}
              </Th>
            </tr>
          </thead>
        ) : null}

        <tbody css={tbodyStyle}>
          {parameters.map(parameter => {
            return (
              <tr key={parameter.key}>
                <Td css={nameColStyle}>
                  <p>
                    <Markdown.InlineCode>{parameter.key}</Markdown.InlineCode>
                    {parameter.required ? <Required>*</Required> : null}
                  </p>
                  <p>
                    {capitalizeFirst(
                      parameter.key === parameter.name
                        ? parameter.type
                        : parameter.name
                    )}
                  </p>
                </Td>
                <Td css={separatorColStyle}>-</Td>
                <Td css={tdStyle}>
                  <p>{parameter.description}</p>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

Parameters.propTypes = {
  title: PropTypes.string,
  parameters: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataTestId: PropTypes.string,
};

export default Parameters;
