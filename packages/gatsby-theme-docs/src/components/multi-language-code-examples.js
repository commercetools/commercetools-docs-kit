import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications, CodeBlock } from '@commercetools-docs/ui-kit';
import useCodeExamples from '../hooks/use-code-examples';

function reducer(state, action) {
  switch (action.type) {
    case 'set_props':
      return { ...state, props: action.props };
    case 'set_errors':
      return { ...state, errors: action.errors };
    default:
      throw new Error(`"${action.type}" is invalid.`);
  }
}

function MultiLanguageCodeExamples(props) {
  const codeExamples = useCodeExamples();
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    extractProps({
      children: props.children,
      codeExamples,
      callback: (result, err) => {
        if (result) {
          dispatch({ type: 'set_props', props: result });
        } else {
          dispatch({ type: 'set_errors', errors: err });
        }
      },
    });
  }, [codeExamples, props.children]);

  try {
    if (state.errors) {
      if (process.env.NODE_ENV !== 'production') {
        return state.errors.map((err, index) => (
          <ContentNotifications.Error key={index}>
            {err}
          </ContentNotifications.Error>
        ));
      }

      throw new Error(state.errors);
    }

    return state.props ? (
      <CodeBlock multiLanguage={{ title: props.title, props: state.props }} />
    ) : null;
  } catch (e) {
    return null;
  }
}

function extractProps({ children, codeExamples, callback }) {
  const errors = [];
  const props = [];

  children.forEach(child => {
    if (!child.props) {
      errors.push(
        `Content of MultiLanguageCodeExamples must be a CodeExample and not ${JSON.stringify(
          child
        )}`
      );
    } else if (!(child.props.mdxType === 'CodeExample')) {
      errors.push(
        `Content of MultiLanguageCodeExamples must be a CodeExample and not "${child.props.mdxType}"`
      );
    } else {
      const codeExample = codeExamples.find(example => {
        return example.path === child.props.path;
      });

      if (!codeExample) {
        errors.push(`Code example does not exist for ${child.props.file}`);
      } else {
        props.push({
          content: codeExample.content,
          language: codeExample.language,
          highlightLines: child.props.highlightLines || [],
          noPromptLines: child.props.noPromptLines || [],
        });
      }
    }
  });

  if (errors.length) {
    callback(undefined, errors.length ? errors : '');
  } else {
    callback(props);
  }
}

MultiLanguageCodeExamples.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default MultiLanguageCodeExamples;
