import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../table';
import Rows from './rows/rows';

const Properties = ({ title, apiType }) => {
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
        <Rows apiType={apiType} />
      </tbody>
    </Table>
  );
};

Properties.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  apiType: PropTypes.object.isRequired,
};

export default Properties;
