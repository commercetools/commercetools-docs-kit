import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { SideBySide } from '@commercetools-docs/gatsby-theme-docs';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';
import Description from '../description';

const Children = ({
  apiType,
  parentDiscriminator,
  renderDescriptionBelowProperties,
  propertiesTableTitle,
}) => {
  return (
    <SpacingsStack scale="m">
      {apiType.description && !renderDescriptionBelowProperties ? (
        <Description>{apiType.description}</Description>
      ) : null}

      <SideBySide>
        {apiType.properties ? (
          <Properties
            apiType={apiType}
            parentDiscriminator={parentDiscriminator}
            title={propertiesTableTitle}
          />
        ) : null}

        {apiType.examples ? <Examples examples={apiType.examples} /> : null}
      </SideBySide>

      {apiType.description && renderDescriptionBelowProperties ? (
        <Description>{apiType.description}</Description>
      ) : null}

      {apiType.enumeration ? <Enum values={apiType.enumeration} /> : null}
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
