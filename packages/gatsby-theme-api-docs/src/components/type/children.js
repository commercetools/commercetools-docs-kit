import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { sideBySideContainerStyle } from '@commercetools-docs/ui-kit';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const Children = ({
  apiType,
  parentDiscriminator,
  renderDescriptionBelowProperties,
  propertiesTableTitle,
}) => {
  if (renderDescriptionBelowProperties) {
    return (
      <SpacingsStack scale="m">
        {apiType.properties ? (
          <Properties
            apiType={apiType}
            parentDiscriminator={parentDiscriminator}
            title={propertiesTableTitle}
          />
        ) : null}

        {apiType.enumeration || apiType.description ? (
          <Enum
            description={apiType.description}
            values={apiType.enumeration}
          />
        ) : null}
      </SpacingsStack>
    );
  }

  return (
    <SpacingsStack scale="m">
      {apiType.enumeration || apiType.description ? (
        <Enum description={apiType.description} values={apiType.enumeration} />
      ) : null}
      <div css={sideBySideContainerStyle}>
        {apiType.properties ? (
          <Properties
            apiType={apiType}
            parentDiscriminator={parentDiscriminator}
          />
        ) : null}

        {apiType.examples ? <Examples examples={apiType.examples} /> : null}
      </div>
    </SpacingsStack>
  );
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
