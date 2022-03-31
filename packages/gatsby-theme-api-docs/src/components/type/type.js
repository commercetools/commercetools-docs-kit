import React from 'react';
import PropTypes from 'prop-types';
import {
  FullWidthContainer,
  SideBySide,
} from '@commercetools-docs/gatsby-theme-docs';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { generateTypeURN } from '../../utils/ctp-urn';
import reportError from '../../utils/report-error';
import { DescriptionParagraph } from '../description';
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

  const urn = generateTypeURN(matchedApiType);

  if (matchedApiType.enumeration) {
    return (
      <Enum
        values={matchedApiType.enumeration}
        enumDescriptions={matchedApiType.enumDescriptions}
        description={matchedApiType.description}
        displayName={matchedApiType.displayName}
        anchor={urn}
      />
    );
  } else {
    return (
      <FullWidthContainer
        id={urn}
        aria-label={`${matchedApiType.displayName} definition`}
      >
        <SpacingsStack scale="m">
          {matchedApiType.description && (
            <DescriptionParagraph>
              {matchedApiType.description}
            </DescriptionParagraph>
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
        </SpacingsStack>
      </FullWidthContainer>
    );
  }
};

ApiType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiTypes: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  propertiesTableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  doNotRenderExamples: PropTypes.bool,
  hideInheritedProperties: PropTypes.bool,
};

export default ApiType;
