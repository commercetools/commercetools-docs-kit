import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';

const Description = (props) => (
  <div
    css={css`
    ${Markdown.typographyContainerStyle}
    max-width: ${designSystem.dimensions.widths.pageContent}
    `}
  >
    {typeof props.children === 'string'
      ? markdownFragmentToReact(props.children)
      : props.children}
  </div>
);
Description.propTypes = {
  children: PropTypes.any,
};

export default Description;
