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
    <FullWidthContainer>
      <SpacingsStack scale="s">
        {title ? (
          <TitleWithAnchor id={id}>{title}</TitleWithAnchor>
        ) : (
          // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
          <a name={id}></a>
        )}

        {method.description && (
          <DescriptionParagraph>{method.description}</DescriptionParagraph>
        )}

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

              {method.body && (
                <RequestRepresentation
                  apiKey={apiKey}
                  apiType={method.body.applicationjson.type}
                />
              )}

              {method.responses && (
                <Responses apiKey={apiKey} responses={method.responses} />
              )}
            </SpacingsStack>
            <RequestResponseExamples
              apiKey={apiKey}
              requestCodeExamples={method.codeExamples}
              responses={method.responses}
            />
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
