import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Markdown } from '@commercetools-docs/gatsby-theme-docs';
import markdownToReact from '../../../utils/markdown-to-react';

const Description = ({ description, title }) => {
  if (!description) return null;

  let cssString = '';
  if (title) {
    cssString = `
      margin: 0.5rem 0;
    `;
  }

  return (
    <div data-testid="api-type__description">
      {title ? (
        <Markdown.H4 data-testid="api-type__description__title">
          {title}
        </Markdown.H4>
      ) : null}

      <div data-testid="api-type__description__text" css={css(cssString)}>
        {markdownToReact(description)}
      </div>
    </div>
  );
};

Description.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Description;
