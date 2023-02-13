import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { MultiCodeBlock, CodeBlock } from '@commercetools-docs/ui-kit';

const Examples = ({ examples }) => {
  if (!examples) {
    throw new Error('Must pass examples props to Examples component.');
  }

  return (
    <SpacingsStack scale="m" data-is-wide-sticky="true">
      {examples.map((example) => {
        return (
          <MultiCodeBlock
            key={example.name}
            title={`Example: ${extractExampleTitle(example)}`}
          >
            <CodeBlock language="json" content={example.value} />
          </MultiCodeBlock>
        );
      })}
    </SpacingsStack>
  );

  function extractExampleTitle(example) {
    if (example.displayName) return example.displayName;
    if (example.name) return example.name === 'default' ? '' : example.name;
    return '';
  }
};

Examples.propTypes = {
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default Examples;
