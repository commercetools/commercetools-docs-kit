import React from 'react';
import PropTypes from 'prop-types';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import extractAdditionalInfo from '../../../../utils/extract-additional-info';
import Enum from '../../enum';

const Description = ({ property, discriminatorValue }) => {
  const additionalInfo = extractAdditionalInfo(property);
  const additionalInfoKeysArray = Object.keys(additionalInfo);
  const renderEnums = property.enumeration && !discriminatorValue;
  return (
    <div>
      {renderEnums ? (
        <Enum
          description={property.description}
          values={property.enumeration}
        />
      ) : (
        markdownFragmentToReact(property.description)
      )}

      <p>
        {additionalInfoKeysArray.map((key, index) => {
          return `${key}: ${additionalInfo[key]}${
            index < additionalInfoKeysArray.length - 1 ? ', ' : ''
          }`;
        })}
      </p>

      {!renderEnums &&
      !property.description &&
      !additionalInfoKeysArray.length ? (
        <p>{'-'}</p>
      ) : null}
    </div>
  );
};

Description.propTypes = {
  property: PropTypes.object.isRequired,
  discriminatorValue: PropTypes.string,
};

export default Description;
