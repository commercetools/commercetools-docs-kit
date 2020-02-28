import React from 'react';
import PropTypes from 'prop-types';

function CodeSampleFromFile(props) {
  return <p> Render code for {props.name}</p>;
}

CodeSampleFromFile.propTypes = {
  name: PropTypes.string,
};

export default CodeSampleFromFile;
