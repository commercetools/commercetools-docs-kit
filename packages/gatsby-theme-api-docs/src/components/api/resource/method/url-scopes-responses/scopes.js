import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';
import { Markdown } from '@commercetools-docs/ui-kit';

import Title from './title';

const ListContainer = styled.p`
  margin-top: ${customProperties.spacingXs};
`;

const Scopes = ({ scopes, title }) => {
  return (
    <div>
      {title ? <Title>{title}</Title> : null}

      <ListContainer>
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
      </ListContainer>
    </div>
  );
};

Scopes.propTypes = {
  title: PropTypes.string,
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
