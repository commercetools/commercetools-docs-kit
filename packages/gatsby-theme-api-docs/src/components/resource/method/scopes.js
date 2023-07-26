import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import Title from './title';

const Scopes = (props) => {
  return (
    <SpacingsStack scale="xs">
      <Title>OAuth 2.0 Scopes:</Title>

      <div>
        {props.scopes.map((scope, index) => (
          <Markdown.InlineCodeWithoutBox key={scope}>
            {scope}
            {index < props.scopes.length - 1 && ' , '}
          </Markdown.InlineCodeWithoutBox>
        ))}
      </div>
    </SpacingsStack>
  );
};

Scopes.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
