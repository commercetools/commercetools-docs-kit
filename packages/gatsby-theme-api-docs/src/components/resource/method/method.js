import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  designSystem as uiKitDesignSystem,
  Markdown,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import { generateEndpointURN } from '../../../utils/ctp-urn';
import {
  oauth2Scopes,
  queryParametersTitle,
  pathParametersTitle,
} from '../../../utils/constants';
import { tokens, dimensions, colors, typography } from '../../../design-system';
import UrlScopesResponses from './url-scopes-responses';
import Parameters from './parameters';
import RequestRepresentation from './request-representation';

const Title = styled.span`
  font-size: ${uiKitDesignSystem.typography.fontSizes.h3};
  font-weight: ${uiKitDesignSystem.typography.fontWeights.medium};
  line-height: ${typography.lineHeights.methodTitle};
`;

const UrlScopesResponseContainer = styled.div`
  background-color: ${uiKitDesignSystem.colors.light.surfacePrimary};
  border: ${dimensions.widths.tableBorder} solid ${colors.light.border};
  border-radius: ${tokens.borderRadiusForTable};
  box-shadow: ${tokens.shadowForUrlScopesResponse};
  border-left-width: ${dimensions.widths.methodBorderLeft};
`;

const Description = styled.p`
  line-height: ${uiKitDesignSystem.typography.lineHeights.body};
`;

const TitleWithAnchor = Markdown.withAnchorLink(Title);

const Method = ({
  apiKey,
  uris,
  resourceUriParameters,
  method,
  methodType,
}) => {
  let allUriParameters = [];
  if (resourceUriParameters) {
    allUriParameters = allUriParameters.concat(resourceUriParameters);
  }

  if (method.uriParameters) {
    allUriParameters = allUriParameters.concat(method.uriParameters);
  }
  const methodColor = computeMethodColor(methodType.toLowerCase());

  const id = generateEndpointURN({
    apiKey,
    path: new URL(`${uris.baseUri}${uris.resourcePathUri}`).pathname,
    method: methodType,
  });

  return (
    <SpacingsStack scale="s">
      <TitleWithAnchor id={id}>{method.displayName}</TitleWithAnchor>

      <Description>{markdownFragmentToReact(method.description)}</Description>

      <SpacingsStack scale="m">
        <UrlScopesResponseContainer
          css={css`
            border-left-color: ${methodColor};
          `}
        >
          <UrlScopesResponses
            apiKey={apiKey}
            method={methodType}
            methodColor={methodColor}
            uris={uris}
            scopes={{
              title: oauth2Scopes,
              scopes: method.securedBy
                ? method.securedBy[0].oauth_2_0.scopes
                : null,
            }}
            responses={method.responses}
          />
        </UrlScopesResponseContainer>

        {allUriParameters.length > 0 && (
          <Parameters
            title={pathParametersTitle}
            parameters={allUriParameters}
          />
        )}

        {method.queryParameters && (
          <Parameters
            apiKey={apiKey}
            title={queryParametersTitle}
            parameters={method.queryParameters}
          />
        )}

        {method.body && (
          <RequestRepresentation
            apiKey={apiKey}
            apiType={method.body.applicationjson.type}
          />
        )}
      </SpacingsStack>
    </SpacingsStack>
  );
};

function computeMethodColor(methodName) {
  switch (methodName) {
    case 'get':
      return colors.light.methods.get;
    case 'post':
    case 'put':
      return colors.light.methods.post;
    case 'delete':
      return colors.light.methods.delete;
    default:
      throw new Error(
        `Must explicitly define color code for "${methodName}" method.`
      );
  }
}

Method.propTypes = {
  apiKey: PropTypes.string.isRequired,
  uris: PropTypes.shape({
    baseUri: PropTypes.string.isRequired,
    resourcePathUri: PropTypes.string,
  }).isRequired,
  resourceUriParameters: PropTypes.arrayOf(PropTypes.object.isRequired),
  method: PropTypes.object.isRequired,
  methodType: PropTypes.string.isRequired,
};

export default Method;
