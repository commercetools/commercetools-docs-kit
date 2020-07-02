import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Description from './description';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const Children = ({
  apiType,
  parentDiscriminator,
  renderDescriptionBelowProperties,
  propertiesTableTitle,
}) => {
  return (
    <SpacingsStack scale="m">
      {!renderDescriptionBelowProperties && renderDescriptionAndEnums()}

      {apiType.properties && (
        <Properties
          apiType={apiType}
          parentDiscriminator={parentDiscriminator}
          title={propertiesTableTitle}
        />
      )}

      {renderDescriptionBelowProperties && renderDescriptionAndEnums()}

      {apiType.examples && <Examples examples={apiType.examples} />}
    </SpacingsStack>
  );

  function renderDescriptionAndEnums() {
    return (
      <>
        {apiType.description && (
          <Description>{apiType.description}</Description>
        )}
        {apiType.enumeration && (
          <Enum
            values={apiType.enumeration}
            enumDescriptions={apiType.enumDescriptions}
          />
        )}
      </>
    );
  }
};

Children.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  renderDescriptionBelowProperties: PropTypes.bool,
  propertiesTableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Children;
