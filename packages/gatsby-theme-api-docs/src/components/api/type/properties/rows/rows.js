import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/gatsby-theme-docs';
import { Td } from '../../../../elements';
import Type from '../type';
import Description from './description';

const Rows = ({
  apiType,
  parentDiscriminator,
  discriminatorValue,
  dataTestIdPrefix,
}) => {
  return apiType.properties.map(property => {
    return (
      <tr
        key={property.name}
        data-testid={
          dataTestIdPrefix ? `${dataTestIdPrefix}${property.name}` : null
        }
      >
        <Td>
          {property.name}
          {parentDiscriminator && property.name === parentDiscriminator ? (
            <>
              : <Markdown.InlineCode>{discriminatorValue}</Markdown.InlineCode>
            </>
          ) : null}
        </Td>
        <Td>
          <Type apiKey={apiType.apiKey} property={property} />
        </Td>
        <Td>
          <Description
            property={property}
            discriminatorValue={discriminatorValue}
          />
        </Td>
      </tr>
    );
  });
};

Rows.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  discriminatorValue: PropTypes.string,
  dataTestIdPrefix: PropTypes.string,
};

export default Rows;
