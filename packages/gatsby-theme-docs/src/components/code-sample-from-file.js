import React from 'react';
import PropTypes from 'prop-types';

// import Java from '../code-samples/test.java';

function CodeSampleFromFile() {
  // console.log(process.cwd())
  // import(props.path).then(Component => {
  //   console.log(Component);
  // });

  return <p> Render code from code sample</p>;
}

CodeSampleFromFile.propTypes = {
  path: PropTypes.string,
};

export default CodeSampleFromFile;
