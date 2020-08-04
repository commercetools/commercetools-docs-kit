import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { MultiCodeBlock, CodeBlock } from '@commercetools-docs/ui-kit';

const RequestExamples = ({ examples }) => {
  if (!examples) {
    throw new Error('Must pass examples props to RequestExamples component.');
  }

  return (
    <SpacingsStack scale="m">
      <MultiCodeBlock title={`Request Example:`}>
        {examples.map((example) => {
          return (
            <CodeBlock
              key={example.language}
              language={example.language}
              content={example.value}
            />
          );
        })}
      </MultiCodeBlock>
    </SpacingsStack>
  );
};

RequestExamples.propTypes = {
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default RequestExamples;
