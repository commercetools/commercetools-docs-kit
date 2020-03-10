import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentNotifications /* , CodeBlock */,
} from '@commercetools-docs/ui-kit';
// import useCodeExamples from '../hooks/use-code-examples';

function MultiLanguageCodeExamples(props) {
  // const codeExamples = useCodeExamples();
  const propsArray = extractProps(props.children);

  if (!propsArray.length) {
    return reportError(
      'All children of MultiLanguageCodeExamples must be CodeExample component'
    );
  }

  // const codeBlockMulti = <CodeBlock multiLanguage={}/>

  console.log(propsArray);

  return props.children;
}

function extractProps(children) {
  let props = [];

  children.every(child => {
    if (
      !child.props ||
      !child.props.mdxType ||
      !(child.props.mdxType === 'CodeExample')
    ) {
      props = [];
      return false;
    }

    props.push({ ...child.props });

    return true;
  });

  return props;
}

// function findContents() {}

function reportError(errorMsg) {
  if (process.env.NODE_ENV !== 'production') {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

MultiLanguageCodeExamples.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default MultiLanguageCodeExamples;
