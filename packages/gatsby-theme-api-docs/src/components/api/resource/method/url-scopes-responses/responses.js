import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '@commercetools-docs/gatsby-theme-docs';

import { useTypeLocations } from '../../../../../hooks/use-type-locations';

import Title from './title';

const ResposeCode = styled.span`
  font-size: 14px;
  color: #fff;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
`;

const LinkContainer = styled.span`
  margin-left: 0.5rem;
`;

const Responses = ({ apiKey, responses, title }) => {
  const typeLocations = useTypeLocations();

  return (
    <div>
      {title ? <Title>{title}</Title> : null}

      {responses.map(response => {
        return (
          <p key={response.code}>
            <ResposeCode css={computeStatusCodeBackgroundColor(response.code)}>
              {response.code}
            </ResposeCode>
            <LinkContainer>
              {response.body
                ? renderTypeAsLink(
                    apiKey,
                    response.body.applicationjson.type,
                    typeLocations
                  )
                : 'No body is returned.'}
            </LinkContainer>
          </p>
        );
      })}
    </div>
  );
};

function computeStatusCodeBackgroundColor(code) {
  const parsed = parseInt(code, 10);

  if (parsed >= 400 && parsed < 500) {
    return css`
      background-color: #f16d0e;
    `;
  }

  if (parsed >= 500) {
    return css`
      background-color: #e60050;
    `;
  }

  return css`
    background-color: #00ccb4;
  `;
}

function renderTypeAsLink(apiKey, type, typeLocations) {
  const typeLocation = typeLocations
    ? typeLocations[`${apiKey}__${type}`]
    : undefined;

  const originalTypeLocation = typeLocation ? typeLocation.urlAnchorTag : '';

  return originalTypeLocation ? (
    <Link href={originalTypeLocation}>{type}</Link>
  ) : (
    type
  );
}

Responses.propTypes = {
  apiKey: PropTypes.string.isRequired,
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      body: PropTypes.object,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default Responses;
