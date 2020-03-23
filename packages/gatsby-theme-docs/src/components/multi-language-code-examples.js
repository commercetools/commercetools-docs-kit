import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentNotifications,
  MultiCodeBlock,
} from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function MultiLanguageCodeExamples(props) {
  const codeExamples = useCodeExamples();

  try {
    const result = extractProps(props.children, codeExamples);

    return (
      <MultiCodeBlock
        title={props.title}
        languages={result.languages}
        codeBlockProps={result.codeBlockProps}
      />
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
  const languages = [];
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
        languages.push(codeExample.language);
        codeBlockProps.push({
          content: codeExample.content,
          language: codeExample.language,
          highlightLines: child.props.highlightLines || [],
          noPromptLines: child.props.noPromptLines || [],
        });
      }
    }
  });

  return { languages, codeBlockProps };
}

MultiLanguageCodeExamples.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default MultiLanguageCodeExamples;
