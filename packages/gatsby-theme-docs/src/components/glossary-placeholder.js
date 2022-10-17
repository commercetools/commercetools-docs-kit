import React from 'react';
import PropTypes from 'prop-types';

const Glossary = (props) => {
  return <>{props.children}</>;
};
Glossary.propTypes = {
  children: PropTypes.node,
};
export default Glossary;
