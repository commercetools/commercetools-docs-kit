import React from 'react';
import PropTypes from 'prop-types';
import NameType from './name-type';
import Description from './description';

const Rows = (props) => {
  return props.apiType.properties.map((property) => {
    return (
      <tr key={property.name}>
        <td>
          <NameType apiKey={props.apiType.apiKey} property={property} />
        </td>
        <td>
          <Description
            apiKey={props.apiKey}
            property={property}
            discriminatorValue={props.apiType.discriminatorValue}
          />
        </td>
      </tr>
    );
  });
};

Rows.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.object.isRequired,
};

export default Rows;
