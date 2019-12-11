import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { generateEndpointURN } from '../../../../utils/ctp-urn';
import {
  oauth2Scopes,
  queryParametersTitle,
  pathParametersTitle,
  requestRepresentation,
} from '../../../../utils/constants';
import UrlScopesResponses from './url-scopes-responses';
import Parameters from './parameters';
import RequestRepresentation from './request-representation';

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const MethodNameContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
`;

const MethodName = styled.span`
  color: #fff;
  font-size: 1.25rem;
  text-transform: uppercase;
`;

const Title = styled.p`
  margin-left: 1rem;
`;

const UrlScopesResponseOverallContainer = styled.div`
  display: flex;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  margin: 0.5rem 0;
`;

const UrlScopesResponseContainerStart = styled.div`
  width: 8px;
  border-radius: 5px 0 0 5px;
  background-color: #078cdf;
`;

const UrlScopesResponseContainer = styled.div`
  padding: 1rem;
`;

const Method = ({ apiKey, url, method }) => {
  return (
    <div
      key={method.method}
      id={generateEndpointURN({
        apiKey,
        path: new URL(url).pathname,
        method: method.method,
      })}
    >
      <Header>
        <MethodNameContainer
          css={computeMethodNameBackgroundColor(method.method)}
        >
          <MethodName>{method.method}</MethodName>
        </MethodNameContainer>

        <Title>
          <strong>{method.displayName}</strong>
        </Title>
      </Header>
      <p>{method.description}</p>
      <UrlScopesResponseOverallContainer>
        <UrlScopesResponseContainerStart />
        <UrlScopesResponseContainer>
          <UrlScopesResponses
            data={{
              url,
              scopes: {
                title: oauth2Scopes,
                scopes: method.securedBy[0].scopes,
              },
              responses: method.responses,
            }}
          />
        </UrlScopesResponseContainer>
      </UrlScopesResponseOverallContainer>
      {method.allUriParameters ? (
        <Parameters
          title={pathParametersTitle}
          parameters={method.allUriParameters}
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
          apiType={method.body[0].name}
        />
      ) : null}
    </div>
  );
};

function computeMethodNameBackgroundColor(methodName) {
  switch (methodName) {
    case 'post':
      return css`
        background-color: #00ccb4;
      `;
    case 'delete':
      return css`
        background-color: #e60050;
      `;
    default:
      return css`
        background-color: #078cdf;
      `;
  }
}

Method.propTypes = {
  apiKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  method: PropTypes.object.isRequired,
};

export default Method;
