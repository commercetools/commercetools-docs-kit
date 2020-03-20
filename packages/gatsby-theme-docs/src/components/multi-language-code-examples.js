import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications, CodeBlock } from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function MultiLanguageCodeExamples(props) {
  const codeExamples = useCodeExamples();
  let languages;
  let codeBlockProps;
  let currentCodeBlockProp;

  try {
    const result = extractProps(props.children, codeExamples);

    languages = result.languages;
    codeBlockProps = result.codeBlockProps;
    currentCodeBlockProp = {
      content: codeBlockProps[languages[0]].content,
      language: languages[0],
      highlightLines: codeBlockProps[languages[0]].highlightLines,
      noPromptLines: codeBlockProps[languages[0]].noPromptLines,
    };

    return (
      <CodeBlock
        content={currentCodeBlockProp.content}
        language={currentCodeBlockProp.language}
        highlightLines={currentCodeBlockProp.highlightLines}
        noPromptLines={currentCodeBlockProp.noPromptLines}
        multiLanguage={{
          title: props.title,
          languages,
          handleOnLanguageChange,
        }}
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

  function handleOnLanguageChange(e) {
    const newProps = codeBlockProps[e.target.value];
    console.log(newProps);

    currentCodeBlockProp = {
      content: newProps.content,
      language: e.target.value,
      highlightLines: newProps.highlightLines,
      noPromptLines: newProps.noPromptLines,
    };
  }
}

function extractProps(children, codeExamples) {
  const languages = [];
  const codeBlockProps = {};

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
        codeBlockProps[codeExample.language] = {
          content: codeExample.content,
          language: codeExample.language,
          highlightLines: child.props.highlightLines || [],
          noPromptLines: child.props.noPromptLines || [],
        };
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
