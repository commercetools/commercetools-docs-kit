import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

import SpacingsInline from '@commercetools-uikit/spacings-inline';

import Title from './title';

const Scope = styled.span`
  display: inline-block;
  margin-right: ${designSystem.dimensions.spacings.xs};
  white-space: nowrap;
`;

const Scopes = ({ scopes, title }) => {
  return (
    <SpacingsInline>
      {title && <Title>{title}:</Title>}

      <div>
        {scopes.map((scope, index) => (
          <Scope key={scope}>
            <Markdown.InlineCode>{scope}</Markdown.InlineCode>
            {index < scopes.length - 1 && ','}
          </Scope>
        ))}
      </div>
    </SpacingsInline>
  );
};

Scopes.propTypes = {
  title: PropTypes.string,
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
