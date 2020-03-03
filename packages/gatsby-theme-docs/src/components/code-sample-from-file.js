import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CodeBlock } from '@commercetools-docs/ui-kit';

// import Java from '../code-samples/test.java';

// CodeBlockFromImport
function CodeSampleFromFile(props) {
  const [sample, setSample] = useState('');

  // props.import - path to code sample
  import(`../code-samples/${props.name}`).then(result => {
    setSample(result.default);
  });

  return <CodeBlock content={sample} language={props.language} />;
}

CodeSampleFromFile.propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
};

export default CodeSampleFromFile;
