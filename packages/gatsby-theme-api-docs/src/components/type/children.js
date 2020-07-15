import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { SideBySide } from '@commercetools-docs/gatsby-theme-docs';
import Description from './description';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const Children = ({
  apiType,
  renderDescriptionBelowProperties,
  propertiesTableTitle,
}) => {
  return (
    <SpacingsStack scale="m">
      {!renderDescriptionBelowProperties && renderDescriptionAndEnums()}

      <SideBySide>
        {apiType.properties && (
          <Properties apiType={apiType} title={propertiesTableTitle} />
        )}

        {apiType.examples && <Examples examples={apiType.examples} />}
      </SideBySide>

      {renderDescriptionBelowProperties && renderDescriptionAndEnums()}
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
  renderDescriptionBelowProperties: PropTypes.bool,
  propertiesTableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Children;
