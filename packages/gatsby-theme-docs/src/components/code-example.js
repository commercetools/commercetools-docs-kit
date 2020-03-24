import React from 'react';
import PropTypes from 'prop-types';
import {
  MultiCodeBlock,
  CodeBlock,
  ContentNotifications,
} from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function CodeExample(props) {
  const codeExamples = useCodeExamples();

  const codeExample = codeExamples.find(example => {
    return example.path === props.path;
  });

  if (!codeExample) {
    return reportError(
      `Unable to find file "${props.path}" within the "code-examples" folder. Make sure that the file exists and matches the value passed to the "file" property.`
    );
  }

  return (
    <MultiCodeBlock title={props.title}>
      <CodeBlock
        content={codeExample.content}
        language={codeExample.language}
        highlightLines={props.highlightLines || []}
        noPromptLines={props.noPromptLines || []}
      />
    </MultiCodeBlock>
  );
}

function reportError(errorMsg) {
  if (process.env.NODE_ENV !== 'production') {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

CodeExample.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  highlightLines: PropTypes.arrayOf(PropTypes.number),
  noPromptLines: PropTypes.arrayOf(PropTypes.number),
};

export default CodeExample;
