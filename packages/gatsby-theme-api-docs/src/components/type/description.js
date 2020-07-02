import React from 'react';
import PropTypes from 'prop-types';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';

const Description = (props) => {
  if (!props.children) {
    throw new Error(
      'Must pass children to Description component --- <Description>{children}</Description>.'
    );
  }

  return <div>{markdownFragmentToReact(props.children)}</div>;
};

Description.propTypes = {
  children: PropTypes.string,
};

export default Description;
