import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import Type from '../type';
import Description from './description';

const Rows = ({ apiType, parentDiscriminator, discriminatorValue }) => {
  return apiType.properties.map(property => {
    return (
      <tr key={property.name}>
        <td>
          {property.name}
          {parentDiscriminator && property.name === parentDiscriminator ? (
            <>
              : <Markdown.InlineCode>{discriminatorValue}</Markdown.InlineCode>
            </>
          ) : null}
        </td>
        <td>
          <Type apiKey={apiType.apiKey} property={property} />
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
