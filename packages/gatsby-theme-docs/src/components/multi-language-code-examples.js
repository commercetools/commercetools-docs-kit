import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentNotifications,
  MultiCodeBlock,
  CodeBlock,
} from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function MultiLanguageCodeExamples(props) {
  const codeExamples = useCodeExamples();

  try {
    const codeBlockProps = extractProps(props.children, codeExamples);

    return (
      <MultiCodeBlock title={props.title}>
        {codeBlockProps.map(cbProps => (
          <CodeBlock
            key={cbProps.language}
            content={cbProps.content}
            language={cbProps.language}
            highlightLines={cbProps.highlightLines || []}
            noPromptLines={cbProps.noPromptLines || []}
          />
        ))}
      </MultiCodeBlock>
    );
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <ContentNotifications.Error>{e.message}</ContentNotifications.Error>
      );
    }

    throw new Error(e.message);
  }
}

function extractProps(children, codeExamples) {
  const codeBlockProps = [];

  children.forEach(child => {
    if (!child.props) {
      throw new Error(
        `Content of MultiLanguageCodeExamples must be a CodeExample and not ${JSON.stringify(
          child
        )}`
      );
    } else if (child.props.mdxType !== 'CodeExample') {
      throw new Error(
        `Content of MultiLanguageCodeExamples must be a CodeExample and not "${child.props.mdxType}"`
      );
    } else {
      const codeExample = codeExamples.find(example => {
        return example.path === child.props.path;
      });
      if (!codeExample) {
        throw new Error(`Code example does not exist for ${child.props.path}`);
      } else {
        codeBlockProps.push({
          content: codeExample.content,
          language: codeExample.language,
          highlightLines: child.props.highlightLines,
          noPromptLines: child.props.noPromptLines,
        });
      }
    }
  });

  return codeBlockProps;
}

MultiLanguageCodeExamples.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default MultiLanguageCodeExamples;
