import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  designSystem as uiKitDesignSystem,
  Markdown,
} from '@commercetools-docs/ui-kit';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { generateEndpointURN } from '../../../../utils/ctp-urn';
import {
  oauth2Scopes,
  queryParametersTitle,
  pathParametersTitle,
  requestRepresentation,
} from '../../../../utils/constants';
import {
  tokens,
  dimensions,
  colors,
  typography,
} from '../../../../design-system';
import UrlScopesResponses from './url-scopes-responses';
import Parameters from './parameters';
import RequestRepresentation from './request-representation';

const Type = styled.span`
  font-size: ${uiKitDesignSystem.typography.fontSizes.h4};
  line-height: ${typography.lineHeights.methodType};
  color: ${uiKitDesignSystem.colors.light.surfacePrimary};
  padding: ${uiKitDesignSystem.dimensions.spacings.xs}
    ${uiKitDesignSystem.dimensions.spacings.m};
  border-radius: ${tokens.borderRadiusForMethodType};
  text-transform: uppercase;
`;

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

const Method = ({ apiKey, url, resourceUriParameters, method, methodType }) => {
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
    path: new URL(url).pathname,
    method: methodType,
  });

  return (
    <SpacingsStack scale="s">
      <SpacingsInline alignItems="center" scale="s">
        <Type
          css={css`
            background-color: ${methodColor};
          `}
        >
          {methodType}
        </Type>

        <TitleWithAnchor id={id}>{method.displayName}</TitleWithAnchor>
      </SpacingsInline>

      <Description>{method.description}</Description>

      <SpacingsStack scale="m">
        <UrlScopesResponseContainer
          css={css`
            border-left-color: ${methodColor};
          `}
        >
          <UrlScopesResponses
            data={{
              apiKey,
              url,
              scopes: {
                title: oauth2Scopes,
                scopes: method.securedBy
                  ? method.securedBy[0].oauth_2_0.scopes
                  : null,
              },
              responses: method.responses,
            }}
          />
        </UrlScopesResponseContainer>

        {allUriParameters.length > 0 ? (
          <Parameters
            title={pathParametersTitle}
            parameters={allUriParameters}
          />
        ) : null}

        {method.queryParameters ? (
          <Parameters
            title={queryParametersTitle}
            parameters={method.queryParameters}
          />
        ) : null}

        {method.body ? (
          <RequestRepresentation
            titleSuffix={requestRepresentation}
            apiKey={apiKey}
            apiType={method.body.applicationjson.type}
          />
        ) : null}
      </SpacingsStack>
    </SpacingsStack>
  );
};

function computeMethodColor(methodName) {
  switch (methodName) {
    case 'post':
      return colors.light.methods.post;
    case 'delete':
      return colors.light.methods.delete;
    default:
      return colors.light.methods.get;
  }
}

Method.propTypes = {
  apiKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  resourceUriParameters: PropTypes.arrayOf(PropTypes.object.isRequired),
  method: PropTypes.object.isRequired,
  methodType: PropTypes.string.isRequired,
};

export default Method;
