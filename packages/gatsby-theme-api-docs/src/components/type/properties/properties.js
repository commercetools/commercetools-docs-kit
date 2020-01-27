import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../table';
import Rows from './rows/rows';

const Properties = ({ apiType, parentDiscriminator }) => {
  if (!apiType.properties) {
    throw new Error('Must pass properties props to Properties component.');
  }

  return (
    <Table>
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
};

export default Properties;
