import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../table';
import Rows from './rows/rows';

const Properties = ({ title, apiType, parentDiscriminator }) => {
  if (!apiType.properties) {
    throw new Error('Must pass properties props to Properties component.');
  }

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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
};

export default Properties;
