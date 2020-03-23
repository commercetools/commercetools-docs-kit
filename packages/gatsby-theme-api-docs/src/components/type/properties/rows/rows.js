import React from 'react';
import PropTypes from 'prop-types';
import NameType from './name-type';
import Description from './description';

const Rows = ({ apiType, parentDiscriminator, discriminatorValue }) => {
  return apiType.properties.map((property) => {
    return (
      <tr key={property.name}>
        <td>
          <NameType
            apiKey={apiType.apiKey}
            property={property}
            parentDiscriminator={parentDiscriminator}
            discriminatorValue={discriminatorValue}
          />
        </td>
        <td>
          <Description
            property={property}
            discriminatorValue={discriminatorValue}
          />
        </td>
      </tr>
    );
  });
};

Rows.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  discriminatorValue: PropTypes.string,
};

export default Rows;
