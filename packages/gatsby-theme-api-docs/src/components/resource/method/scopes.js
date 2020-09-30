import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

import { Title } from './styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const Scopes = ({ scopes, title }) => {
  return (
    <Container>
      {title && <Title>{`${title}:`}</Title>}

      <ScopeList>
        {scopes.map((scope, index) => (
          <Scope key={scope}>
            <Markdown.InlineCode>{scope}</Markdown.InlineCode>
            {index < scopes.length - 1 && ','}
          </Scope>
        ))}
      </ScopeList>
    </Container>
  );
};

Scopes.propTypes = {
  title: PropTypes.string,
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
