import React from 'react';
import PropTypes from 'prop-types';
import { FullWidthContainer } from '@commercetools-docs/gatsby-theme-docs';
import { generateTypeURN } from '../../utils/ctp-urn';
import { useApiTypes } from '../../hooks/use-api-types';
import reportError from '../../utils/report-error';
import Children from './children';

const ApiType = (props) => {
  const apiTypes = useApiTypes();

  const matchedApiType = apiTypes.find((apiType) => {
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

  return (
    <FullWidthContainer
      id={urn}
      aria-label={`${matchedApiType.displayName} definition`}
    >
      <Children
        apiKey={props.apiKey}
        apiType={matchedApiType}
        propertiesTableTitle={props.propertiesTableTitle}
        renderDescriptionBelowProperties={
          props.renderDescriptionBelowProperties
        }
        doNotRenderExamples={props.doNotRenderExamples}
        hideInheritedProperties={props.hideInheritedProperties}
      />
    </FullWidthContainer>
  );
};

ApiType.propTypes = {
  apiKey: PropTypes.string.isRequired,
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
