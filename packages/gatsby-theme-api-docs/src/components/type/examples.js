import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { CodeBlock } from '@commercetools-docs/ui-kit';

const Examples = ({ examples, title }) => {
  if (!examples) {
    throw new Error('Must pass examples props to Examples component.');
  }

  return (
    <SpacingsStack scale="m">
      <p>
        <strong>{title}</strong>
      </p>
      <SpacingsStack scale="m">
        {examples.map((example) => {
          return (
            <CodeBlock
              key={example.name}
              title={example.name ? `${example.name}` : undefined}
              language="json"
              content={example.value}
            />
          );
        })}
      </SpacingsStack>
    </SpacingsStack>
  );
};

Examples.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default Examples;
