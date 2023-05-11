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

const contentTypeToPrimitiveMap = {
  'application/json': {
    number: 'Any JSON "number"',
    any: 'Any valid JSON',
    object: 'Any JSON "object"',
    boolean: 'Any JSON "boolean"',
    string: 'Any JSON "string"',
    array: 'Any JSON "array"',
  },
};

export const getDescriptionIfPrimitiveType = (contentType, type) =>
  contentTypeToPrimitiveMap[contentType] &&
  contentTypeToPrimitiveMap[contentType][type];

const ApiType = (props) => {
  console.log(props);
  let matchedApiType = props.apiTypes.find((apiType) => {
    return (
      apiType.apiKey === props.apiKey && apiType.displayName === props.type
    );
  });

  if (!matchedApiType) {
    if (props.contentType && props.contentType.includes('application/json')) {
      const primitiveTypeDescription = getDescriptionIfPrimitiveType(
        'application/json',
        props.type
      );
      if (primitiveTypeDescription) {
        matchedApiType = {
          displayName: props.type,
          description: primitiveTypeDescription,
        };
      }
    }
  }

  if (!matchedApiType) {
    return reportError(
      `Type with name '${props.type}' not found in '${props.apiKey}' API`
    );
  }

  const urn = generateTypeURN(matchedApiType);

  const shoudldRenderProperties = matchedApiType.properties;
  const shouldRenderExamples =
    matchedApiType.examples && !props.doNotRenderExamples;

  /**
   * When doNotRenderExamples prop is passed, it means that the <ApiType> component is never
   * going to render both properties AND examples, meaning that there's no need to wrap these
   * components into a SideBySide wrapper. A react fragment is enough.
   */
  const WrapperNode = props.doNotRenderExamples ? React.Fragment : SideBySide;

  if (matchedApiType.enumeration) {
    return (
      <Enum
        values={matchedApiType.enumeration}
        enumDescriptions={matchedApiType.enumDescriptions}
        enumGroups={matchedApiType.enumGroups}
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
          {(shoudldRenderProperties || shouldRenderExamples) && (
            <WrapperNode>
              {shoudldRenderProperties && (
                <Properties
                  apiKey={props.apiKey}
                  apiType={matchedApiType}
                  title={props.propertiesTableTitle}
                  hideInheritedProperties={props.hideInheritedProperties}
                />
              )}
              {shouldRenderExamples && (
                <Examples examples={matchedApiType.examples} />
              )}
            </WrapperNode>
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
  contentType: PropTypes.arrayOf(PropTypes.string),
};

export default ApiType;
