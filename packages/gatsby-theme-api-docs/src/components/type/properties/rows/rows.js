import React from 'react';
import PropTypes from 'prop-types';
import NameType from './name-type';
import Description from './description';

const Rows = ({ apiType }) => {
  return apiType.properties.map((property) => {
    return (
      <tr key={property.name}>
        <td>
          <NameType apiKey={apiType.apiKey} property={property} />
        </td>
        <td>
          <Description
            property={property}
            discriminatorValue={apiType.discriminatorValue}
          />
        </td>
      </tr>
    );
  });
};

Rows.propTypes = {
  apiType: PropTypes.object.isRequired,
};

export default Rows;
