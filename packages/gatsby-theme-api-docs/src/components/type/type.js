import React from 'react';
import PropTypes from 'prop-types';
import {
  FullWidthContainer,
  SideBySide,
} from '@commercetools-docs/gatsby-theme-docs';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { generateTypeURN } from '../../utils/ctp-urn';
import reportError from '../../utils/report-error';
import Description from '../description';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const ApiType = (props) => {
  const matchedApiType = props.apiTypes.find((apiType) => {
    return (
      apiType.apiKey === props.apiKey && apiType.displayName === props.type
    );
  });

  if (!matchedApiType) {
    return reportError(
      `Type with name '${props.type}' not found in '${props.apiKey}' API`
    );
  }

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

  const urn = generateTypeURN(matchedApiType);

  return (
    <FullWidthContainer
      id={urn}
      aria-label={`${matchedApiType.displayName} definition`}
    >
      <SpacingsStack scale="m">
        {!props.renderDescriptionBelowProperties && (
          <DescriptionAndEnums apiType={matchedApiType} />
        )}

        {(matchedApiType.properties || matchedApiType.examples) && (
          <SideBySide>
            {matchedApiType.properties && (
              <Properties
                apiKey={props.apiKey}
                apiType={matchedApiType}
                title={props.propertiesTableTitle}
                hideInheritedProperties={props.hideInheritedProperties}
              />
            )}

            {matchedApiType.examples && !props.doNotRenderExamples && (
              <Examples examples={matchedApiType.examples} />
            )}
          </SideBySide>
        )}

        {props.renderDescriptionBelowProperties && (
          <DescriptionAndEnums apiType={matchedApiType} />
        )}
      </SpacingsStack>
    </FullWidthContainer>
  );
};

ApiType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiTypes: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  propertiesTableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  renderDescriptionBelowProperties: PropTypes.bool,
  doNotRenderExamples: PropTypes.bool,
  hideInheritedProperties: PropTypes.bool,
};

export default ApiType;
