import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown } from '@commercetools-docs/ui-kit';

const Title = styled.div`
  color: #999;
`;

const Scopes = ({ scopes, title }) => {
  return (
    <div>
      {title ? (
        <Title>
          <strong>{title}</strong>
        </Title>
      ) : null}

      <p>
        {scopes.map((scope, index) =>
          index === scopes.length - 1 ? (
            <Markdown.InlineCode key={scope}>{scope}</Markdown.InlineCode>
          ) : (
            <span key={scope}>
              <Markdown.InlineCode>{scope}</Markdown.InlineCode>
              {', '}
            </span>
          )
        )}
      </p>
    </div>
  );
};

Scopes.propTypes = {
  title: PropTypes.string,
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
