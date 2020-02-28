import React from 'react';
import PropTypes from 'prop-types';

// import Java from '../code-samples/test.java';

function CodeSampleFromFile(props) {
  // console.log(process.cwd())
  // import(props.path).then(Component => {
  //   console.log(Component);
  // });

  return <p> Render code for {props.path}</p>;
}

CodeSampleFromFile.propTypes = {
  path: PropTypes.string,
};

export default CodeSampleFromFile;
