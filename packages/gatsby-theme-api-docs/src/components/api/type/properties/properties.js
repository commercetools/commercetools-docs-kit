import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Table from '../../table';
import Rows from './rows/rows';

const Properties = ({ apiType, parentDiscriminator }) => {
  if (!apiType.properties) {
    throw new Error('Must pass properties props to Properties component.');
  }

  return (
    <Table
      css={css`
        margin: 0.5rem 0 0;
        word-break: normal;
      `}
    >
      <tbody>
        <Rows
          apiType={apiType}
          parentDiscriminator={parentDiscriminator}
          discriminatorValue={apiType.discriminatorValue}
        />
      </tbody>
    </Table>
  );
};

Properties.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  dataTestId: PropTypes.string,
};

export default Properties;
