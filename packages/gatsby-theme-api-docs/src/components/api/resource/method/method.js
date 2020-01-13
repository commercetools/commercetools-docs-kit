import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { designSystem as uiKitDesignSystem } from '@commercetools-docs/ui-kit';
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
  border-radius: ${tokens.borderRadius16};
  text-transform: uppercase;
`;

const Title = styled.span`
  font-size: ${uiKitDesignSystem.typography.fontSizes.h3};
  font-weight: ${uiKitDesignSystem.typography.fontWeights.medium};
  line-height: ${typography.lineHeights.methodTitle};
`;

const UrlScopesResponseOverallContainer = styled.div`
  border: ${tokens.borderRadius1} solid ${colors.light.border};
  border-radius: ${uiKitDesignSystem.tokens.borderRadius6};
  box-shadow: ${tokens.shadow2};
`;

const UrlScopesResponseContainerStart = styled.div`
  width: ${dimensions.widths.methodBorderLeft};
  border-radius: ${uiKitDesignSystem.tokens.borderRadius6} 0 0
    ${uiKitDesignSystem.tokens.borderRadius6};
  background-color: ${colors.light.methods.get};
`;

const Method = ({ apiKey, url, resourceUriParameters, method, methodType }) => {
  let allUriParameters = [];
  if (resourceUriParameters) {
    allUriParameters = allUriParameters.concat(resourceUriParameters);
  }

  if (method.uriParameters) {
    allUriParameters = allUriParameters.concat(method.uriParameters);
  }

  return (
    <div
      id={generateEndpointURN({
        apiKey,
        path: new URL(url).pathname,
        method: methodType,
      })}
    >
      <SpacingsStack scale="s">
        <SpacingsInline alignItems="center" scale="m">
          <Type
            css={computeMethodNameBackgroundColor(methodType.toLowerCase())}
          >
            {methodType}
          </Type>

          <Title>{method.displayName}</Title>
        </SpacingsInline>

        <p>{method.description}</p>

        <SpacingsStack scale="m">
          <UrlScopesResponseOverallContainer>
            <SpacingsInline alignItems="stretch">
              <UrlScopesResponseContainerStart />
              <UrlScopesResponses
                data={{
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
            </SpacingsInline>
          </UrlScopesResponseOverallContainer>

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
    </div>
  );
};

function computeMethodNameBackgroundColor(methodName) {
  switch (methodName) {
    case 'post':
      return css`
        background-color: ${colors.light.methods.post};
      `;
    case 'delete':
      return css`
        background-color: ${colors.light.methods.delete};
      `;
    default:
      return css`
        background-color: ${colors.light.methods.get};
      `;
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
