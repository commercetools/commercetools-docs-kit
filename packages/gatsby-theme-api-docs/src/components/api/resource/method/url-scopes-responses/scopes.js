import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';

import Title from './title';

const Scopes = ({ scopes, title }) => {
  return (
    <div>
      {title ? <Title>{title}</Title> : null}

      {scopes.map((scope, index) => (
        <span key={scope}>
          <Markdown.InlineCode>{scope}</Markdown.InlineCode>
          {index < scopes.length - 1 ? ', ' : null}
        </span>
      ))}
    </div>
  );
};

Scopes.propTypes = {
  title: PropTypes.string,
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
