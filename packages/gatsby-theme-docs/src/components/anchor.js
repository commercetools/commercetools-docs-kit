import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component is exposed to be used by mdx authors. It returns an anchor with name, and only name attribute.
 *
 * See more usability info here - https://github.com/commercetools/commercetools-docs-kit/issues/337
 *
 * This component also exists since we don't allow html in authoring mdx documents.
 */
const Anchor = (props) => <span id={props.name} />;

Anchor.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Anchor;
