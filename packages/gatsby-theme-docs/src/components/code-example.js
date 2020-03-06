import React from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, ContentNotifications } from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function CodeExample(props) {
  const codeExamples = useCodeExamples();

  const codeExample = codeExamples.find(example => {
    return example.absolutePath.includes(props.import);
  });

  if (!codeExample) {
    return reportError('Code example does not exist');
  }

  const language = props.import.split('.').pop();

  return (
    <CodeBlock
      content={codeExample.content}
      language={language}
      title={props.title}
      highlightLines={props.highlightLines}
      noPromptLines={props.noPromptLines}
    />
  );
}

function reportError(errorMsg) {
  if (process.env.NODE_ENV !== 'production') {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

CodeExample.propTypes = {
  import: PropTypes.string.isRequired,
  title: PropTypes.string,
  highlightLines: PropTypes.arrayOf(PropTypes.number),
  noPromptLines: PropTypes.arrayOf(PropTypes.number),
};

export default CodeExample;
