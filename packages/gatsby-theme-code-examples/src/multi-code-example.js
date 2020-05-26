import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentNotifications,
  MultiCodeBlock,
  CodeBlock,
} from '@commercetools-docs/ui-kit';
import useCodeExamples from './use-code-examples';

function MultiCodeExample(props) {
  const codeExamples = useCodeExamples();

  try {
    return (
      <MultiCodeBlock title={props.title} secondaryTheme={props.secondaryTheme}>
        {React.Children.map(props.children, (child, index) => {
          if (!child.props || child.props.mdxType !== 'CodeExample') {
            throw new Error(
              `Children of <MultiLanguageCodeExamples> must be a <CodeExample> component and not "${
                child.props ? child.props.mdxType : child
              }"`
            );
          }
          if (!child.props.path) {
            throw new Error(
              `The component <CodeExample> is missing the required property "path".`
            );
          }
          const codeExample = codeExamples.find((example) => {
            return example.path === child.props.path;
          });
          if (!codeExample) {
            throw new Error(
              `The provided path "${child.props.path}" does not exist. Please make sure that the code example file exists at the provided path.`
            );
          }
          return (
            <CodeBlock
              key={`${codeExample.language}-${index}`}
              content={codeExample.content}
              language={codeExample.language}
              highlightLines={child.props.highlightLines || []}
              noPromptLines={child.props.noPromptLines || []}
            />
          );
        })}
      </MultiCodeBlock>
    );
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <ContentNotifications.Error>{e.message}</ContentNotifications.Error>
      );
    }

    throw e;
  }
}

MultiCodeExample.propTypes = {
  secondaryTheme: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default MultiCodeExample;
