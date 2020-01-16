import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Markdown } from '@commercetools-docs/ui-kit';

import Title from './title';

const Body = styled.div`
  display: flex;
`;

const ResponseCodeType = styled.div`
  margin-left: 0.5rem;
`;

const ResposeCode = styled.span`
  font-size: 14px;
  color: #fff;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
`;

const responseTypeStyle = css`
  margin-left: 0.5rem;
  a {
    color: inherit;
  }
`;

const Responses = ({ responses, title }) => {
  return (
    <div>
      {title ? <Title>{title}</Title> : null}

      {responses.map(response => {
        if (response.body) {
          return (
            <p key={response.code}>{response.body.applicationjson.type}</p>
          );
        }

        // return (
        //   <div key={response.code}>
        //     <p>No body is returned.</p>
        //     <p>{response.description}</p>
        //     <p>Status Code:</p>

        //   </div>
        // );

        return null;
      })}

      <Body>
        <div>
          <p>Status Code:</p>
        </div>

        <ResponseCodeType>
          {responses.map(response => {
            return (
              <p key={response.code}>
                <ResposeCode
                  css={computeStatusCodeBackgroundColor(response.code)}
                >
                  {response.code}
                </ResposeCode>
                <Markdown.InlineCode css={responseTypeStyle}>
                  {response.body ? (
                    <a href="#">{response.body.applicationjson.type}</a>
                  ) : null}
                </Markdown.InlineCode>
              </p>
            );
          })}
        </ResponseCodeType>
      </Body>
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

Responses.propTypes = {
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      body: PropTypes.object,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default Responses;
