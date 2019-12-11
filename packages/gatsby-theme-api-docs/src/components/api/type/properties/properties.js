import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Table, Th } from '../../../elements';
import Rows from './rows/rows';

const Properties = ({ apiType, parentDiscriminator, strings, dataTestId }) => {
  if (!apiType.properties) {
    throw new Error('Must pass properties props to Properties component.');
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        overflow-x: scroll;
      `}
      data-testid={dataTestId || null}
    >
      <Table
        css={css`
          margin: 0.5rem 0 0;
          word-break: normal;
        `}
      >
        <thead>
          <tr>
            <Th>{strings.name}</Th>
            <Th>{strings.type}</Th>
            <Th>{strings.description}</Th>
          </tr>
          <Rows
            apiType={apiType}
            parentDiscriminator={parentDiscriminator}
            discriminatorValue={apiType.discriminatorValue}
          />
        </thead>
      </Table>
    </div>
  );
};

Properties.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  strings: PropTypes.object,
  dataTestId: PropTypes.string,
};

export default Properties;
