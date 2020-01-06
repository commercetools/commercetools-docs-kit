import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { CodeBlock, Markdown } from '@commercetools-docs/ui-kit';

const Examples = ({ examples, title }) => {
  if (!examples) {
    throw new Error('Must pass examples props to Examples component.');
  }

  return (
    <div>
      <Markdown.H4 data-testid="properties-examples-title">{title}</Markdown.H4>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {examples.map(example => {
          return (
            <div
              data-testid={`properties-example-${example.name}`}
              key={example.key}
              css={css`
                display: flex;
                flex-direction: column;
                margin-top: 1.5rem;
              `}
            >
              <p>{example.name ? `${example.name}:` : null}</p>
              <CodeBlock language="json" content={example.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Examples.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default Examples;
