import React from 'react';
import PropTypes from 'prop-types';
import extractAdditionalInfo from '../../../../../utils/extract-additional-info';
import markdownToReact from '../../../../../utils/markdown-to-react';
import Enum from '../../enum';

const Description = ({
  property,
  discriminatorValue,
  rowDescriptionDataTestId,
}) => {
  const additionalInfo = extractAdditionalInfo(property);
  const additionalInfoKeysArray = Object.keys(additionalInfo);
  return (
    <div
      data-testid={
        rowDescriptionDataTestId ? `${rowDescriptionDataTestId}` : null
      }
    >
      {property.enumeration && !discriminatorValue ? (
        <Enum
          description={{
            text: property.description,
          }}
          values={property.enumeration}
        />
      ) : (
        markdownToReact(property.description)
      )}

      <p
        data-testid={
          rowDescriptionDataTestId
            ? `${rowDescriptionDataTestId}__additional-info`
            : null
        }
      >
        {additionalInfoKeysArray.map((key, index) => {
          if (index === additionalInfoKeysArray.length - 1) {
            return `${key}: ${additionalInfo[key]}`;
          }

          return `${key}: ${additionalInfo[key]}, `;
        })}
      </p>
    </div>
  );
};

Description.propTypes = {
  property: PropTypes.object.isRequired,
  discriminatorValue: PropTypes.string,
  rowDescriptionDataTestId: PropTypes.string,
};

export default Description;
