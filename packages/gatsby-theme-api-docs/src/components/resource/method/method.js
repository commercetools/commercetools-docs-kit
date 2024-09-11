import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import {
  SideBySide,
  FullWidthContainer,
} from '@commercetools-docs/gatsby-theme-docs';
import { generateEndpointURN } from '../../../utils/ctp-urn';
import { tokens, dimensions, colors, typography } from '../../../design-system';
import Url from './url';
import Scopes from './scopes';
import Headers from './headers';
import Responses from './responses';
import Parameters from './parameters';
import QueryParameters from './query-parameters';
import RequestRepresentation from './request-representation';
import { DescriptionParagraph } from '../../description';
import RequestResponseExamples from './request-response-examples';

const Title = styled.h6`
  font-size: ${typography.fontSizes.h4};
  font-weight: ${typography.fontWeights.medium};
`;

const Container = styled.div`
  background-color: ${designSystem.colors.light.surfaceSecondary1};
  border-radius: ${tokens.borderRadiusForTable};
  border-left-width: ${dimensions.widths.methodBorderLeft};
  border-left-style: solid;
  padding: ${dimensions.spacings.m};
`;

const TitleWithAnchor = Markdown.withCopyToClipboard(Title);

export function convertContentType(type) {
  switch (type) {
    case 'applicationjson':
      return 'application/json';
    case 'applicationxwwwformurlencoded':
      return 'application/x-www-form-urlencoded';
    case 'imagejpeg':
      return 'image/jpeg';
    case 'imagepng':
      return 'image/png';
    case 'imagegif':
      return 'image/gif';
    default:
      return '';
  }
}

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

  const requestContentType = [];
  const responseContentType = [];

  if (method.body) {
    const findOutContentTypes = Object.keys(method.body).reduce(
      (list, value) => {
        return method.body[value] !== null ? [...list, value] : [...list];
      },
      []
    );
    findOutContentTypes.forEach((type) => {
      requestContentType.push(convertContentType(type));
    });
  }

  if (method.responses) {
    const findOutContentTypes = [];
    method.responses.forEach((response) => {
      response.body &&
        Object.keys(response.body).forEach((key) => {
          if (convertContentType(key) !== '' && response.body[key]) {
            findOutContentTypes.push(key);
          }
        });
    });

    findOutContentTypes.forEach((type) => {
      responseContentType.push(type);
    });
  }

  const requestHasStructuredDataType =
    requestContentType.includes('application/json') ||
    requestContentType.includes('application/x-www-form-urlencoded');

  const responseHasStructuredDataType =
    responseContentType.includes('applicationjson') ||
    responseContentType.includes('applicationxwwwformurlencoded');

  const methodColor = computeMethodColor(methodType.toLowerCase());

  const id = generateEndpointURN({
    apiKey,
    path: uris.resourcePathUri,
    method: methodType,
  });

  return (
    <FullWidthContainer id={id}>
      <SpacingsStack scale="s">
        {title && <TitleWithAnchor>{title}</TitleWithAnchor>}

        <Container
          css={css`
            border-left-color: ${methodColor};
          `}
        >
          <SideBySide>
            <SpacingsStack scale="l">
              <Url
                apiKey={apiKey}
                method={methodType}
                methodColor={methodColor}
                uris={uris}
              />

              {method.description && (
                <DescriptionParagraph>
                  {method.description}
                </DescriptionParagraph>
              )}

              {method.securedBy && (
                <Scopes scopes={method.securedBy[0].oauth_2_0.scopes} />
              )}

              {allUriParameters.length > 0 && (
                <Parameters
                  title={'Path parameters'}
                  parameters={allUriParameters}
                />
              )}

              {method.queryParameters && (
                <QueryParameters
                  apiKey={apiKey}
                  title={'Query parameters'}
                  queryParameters={method.queryParameters}
                />
              )}

              {method.headers && (
                <Headers
                  apiKey={apiKey}
                  title={'Request headers'}
                  headers={method.headers}
                />
              )}

              {method.body && (
                <RequestRepresentation
                  apiKey={apiKey}
                  apiType={
                    method.body.applicationjson?.type ||
                    method.body.applicationxwwwformurlencoded?.type
                  }
                  isStructuredDataType={requestHasStructuredDataType}
                  contentType={requestContentType}
                />
              )}

              {(!method.body || responseHasStructuredDataType) &&
                method.responses && (
                  <Responses
                    apiKey={apiKey}
                    responses={method.responses}
                    contentType={responseContentType}
                  />
                )}
            </SpacingsStack>
            {(!method.body || responseHasStructuredDataType) && (
              <RequestResponseExamples
                apiKey={apiKey}
                requestCodeExamples={method.codeExamples}
                responses={method.responses}
                contentType={responseContentType}
              />
            )}
          </SideBySide>
        </Container>
      </SpacingsStack>
    </FullWidthContainer>
  );
};

function computeMethodColor(methodName) {
  switch (methodName) {
    case 'get':
      return colors.light.methods.get;
    case 'head':
      return colors.light.methods.head;
    case 'post':
      return colors.light.methods.post;
    case 'patch':
      return colors.light.methods.post;
    case 'put':
      return colors.light.methods.put;
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
