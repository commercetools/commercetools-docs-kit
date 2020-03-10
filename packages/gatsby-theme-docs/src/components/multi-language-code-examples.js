import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications } from '@commercetools-docs/ui-kit';

function MultiLanguageCodeExamples(props) {
  const propsArray = extractProps(props.children);

  if (!propsArray.length) {
    return reportError(
      'All children of MultiLanguageCodeExamples must be CodeExample component'
    );
  }

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
