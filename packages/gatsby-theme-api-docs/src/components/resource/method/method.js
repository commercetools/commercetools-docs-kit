import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import {
  markdownFragmentToReact,
  SideBySide,
} from '@commercetools-docs/gatsby-theme-docs';
import { generateEndpointURN } from '../../../utils/ctp-urn';
import {
  oauth2Scopes,
  queryParametersTitle,
  pathParametersTitle,
  responseRepresentation,
} from '../../../utils/constants';
import { tokens, dimensions, colors, typography } from '../../../design-system';
import Url from './url';
import Scopes from './scopes';
import Responses from './responses';
import Parameters from './parameters';
import RequestRepresentation from './request-representation';
import RequestExamples from './request-examples';

const Title = styled.h6`
  font-size: ${typography.fontSizes.h4};
  font-weight: ${typography.fontWeights.medium};
`;

const Description = styled.p`
  line-height: ${typography.lineHeights.body};
`;

const Container = styled.div`
  border-radius: ${tokens.borderRadiusForTable};
  border-left-width: ${dimensions.widths.methodBorderLeft};
  border-left-style: solid;
  padding: ${dimensions.spacings.s} 0 ${dimensions.spacings.s}
    ${dimensions.spacings.m};
`;

const TitleWithAnchor = Markdown.withAnchorLink(Title);

const Method = ({
  apiKey,
  uris,
  resourceUriParameters,
  method,
  methodType,
  title,
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
      {title ? (
        <TitleWithAnchor id={id}>{title}</TitleWithAnchor>
      ) : (
        <a name={id}></a>
      )}

      {method.description && (
        <Description>{markdownFragmentToReact(method.description)}</Description>
      )}

      <SideBySide>
        <Container
          css={css`
            border-left-color: ${methodColor};
          `}
        >
          <SpacingsStack scale="m">
            <Url
              apiKey={apiKey}
              method={methodType}
              methodColor={methodColor}
              uris={uris}
            />

            {method.securedBy && (
              <Scopes
                scopes={method.securedBy[0].oauth_2_0.scopes}
                title={oauth2Scopes}
              />
            )}

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

            {method.responses && (
              <Responses
                apiKey={apiKey}
                responses={method.responses}
                title={responseRepresentation}
              />
            )}
          </SpacingsStack>
        </Container>
        {method.codeExamples && (
          <RequestExamples examples={method.codeExamples} />
        )}
      </SideBySide>
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
  title: PropTypes.string,
};

export default Method;
