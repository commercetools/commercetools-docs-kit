import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { SideBySide } from '@commercetools-docs/gatsby-theme-docs';
import Description from './description';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const DescriptionAndEnums = (props) => {
  return (
    <>
      {props.apiType.description && (
        <Description>{props.apiType.description}</Description>
      )}
      {props.apiType.enumeration && (
        <Enum
          values={props.apiType.enumeration}
          enumDescriptions={props.apiType.enumDescriptions}
        />
      )}
    </>
  );
};

DescriptionAndEnums.propTypes = {
  apiType: PropTypes.object.isRequired,
};

const Children = (props) => {
  return (
    <SpacingsStack scale="m">
      {!props.renderDescriptionBelowProperties && (
        <DescriptionAndEnums apiType={props.apiType} />
      )}

      <SideBySide>
        {props.apiType.properties && (
          <Properties
            apiKey={props.apiKey}
            apiType={props.apiType}
            title={props.propertiesTableTitle}
          />
        )}

        {props.apiType.examples && (
          <Examples examples={props.apiType.examples} />
        )}
      </SideBySide>

      {props.renderDescriptionBelowProperties && (
        <DescriptionAndEnums apiType={props.apiType} />
      )}
    </SpacingsStack>
  );
};

Children.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.object.isRequired,
  renderDescriptionBelowProperties: PropTypes.bool,
  propertiesTableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Children;
