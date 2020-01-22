import React from 'react';
import PropTypes from 'prop-types';
import extractAdditionalInfo from '../../../../../utils/extract-additional-info';
import markdownToReact from '../../../../../utils/markdown-to-react';
import Enum from '../../enum';

const Description = ({ property, discriminatorValue }) => {
  const additionalInfo = extractAdditionalInfo(property);
  const additionalInfoKeysArray = Object.keys(additionalInfo);
  return (
    <div>
      {property.enumeration && !discriminatorValue ? (
        <Enum
          description={{
            text: property.description,
          }}
          values={property.enumeration}
        />
      ) : (
        <p>{markdownToReact(property.description)}</p>
      )}

      <p>
        {additionalInfoKeysArray.map((key, index) => {
          return `${key}: ${additionalInfo[key]}${
            index < additionalInfoKeysArray.length - 1 ? ', ' : ''
          }`;
        })}
      </p>
    </div>
  );
};

Description.propTypes = {
  property: PropTypes.object.isRequired,
  discriminatorValue: PropTypes.string,
};

export default Description;
