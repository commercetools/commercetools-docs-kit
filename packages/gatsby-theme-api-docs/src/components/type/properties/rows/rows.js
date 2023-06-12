import React from 'react';
import PropTypes from 'prop-types';
import NameType from './name-type';
import Description from './description';

const Rows = (props) => {
  return props.apiType.properties.map((property) => {
    if (
      props.hideInheritedProperties &&
      property.inherited &&
      !property.enumeration
    )
      return undefined;

    return (
      <tr key={property.name}>
        <td>
          <NameType apiKey={props.apiType.apiKey} property={property} />
        </td>
        <td>
          <Description apiKey={props.apiKey} property={property} />
        </td>
      </tr>
    );
  });
};

Rows.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.object.isRequired,
  hideInheritedProperties: PropTypes.bool,
};

export default Rows;
