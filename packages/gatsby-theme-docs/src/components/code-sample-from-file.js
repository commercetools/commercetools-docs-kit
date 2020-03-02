import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import Java from '../code-samples/test.java';

function CodeSampleFromFile(props) {
  const [sample, setSample] = useState('');

  import(`../code-samples/${props.name}`).then(result => {
    setSample(result.default);
  });

  return (
    <div>
      <code>{sample}</code>;
    </div>
  );
}

CodeSampleFromFile.propTypes = {
  name: PropTypes.string,
};

export default CodeSampleFromFile;
