import React from 'react';
import PropTypes from 'prop-types';
import { CodeBlock } from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function CodeExample(props) {
  const codeExamples = useCodeExamples();

  const codeExample = codeExamples.find(example => {
    return example.absolutePath.includes(props.import);
  });

  // TODO return notification warning if code example does not exist
  // throw error in production
  if (!codeExample) {
    return <p>Code does not exist</p>;
  }

  const language = props.import.split('.').pop();

  return <CodeBlock content={codeExample.content} language={language} />;
}

CodeExample.propTypes = {
  import: PropTypes.string,
};

export default CodeExample;
