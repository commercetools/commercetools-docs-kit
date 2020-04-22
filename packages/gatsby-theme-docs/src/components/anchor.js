import React from 'react';
import PropTypes from 'prop-types';

const Anchor = (props) => <a name={props.name} />;

Anchor.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Anchor;
