import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Title from './title';

const ScopeList = styled.div`
  span:first-of-type {
    code {
      padding-left: 0;
    }
  }
`;

const Scope = styled.span`
  display: inline-block;
  margin-right: ${designSystem.dimensions.spacings.xs};
  white-space: nowrap;
`;

const Scopes = (props) => {
  return (
    <SpacingsStack scale="xs">
      <Title>OAuth 2.0 Scopes:</Title>

      <ScopeList>
        {props.scopes.map((scope, index) => (
          <Scope key={scope}>
            <Markdown.InlineCode>{scope}</Markdown.InlineCode>
            {index < props.scopes.length - 1 && ','}
          </Scope>
        ))}
      </ScopeList>
    </SpacingsStack>
  );
};

Scopes.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
