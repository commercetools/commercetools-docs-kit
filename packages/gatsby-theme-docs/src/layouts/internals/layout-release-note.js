import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNoteBody from './layout-release-note-body';

const ReleaseNote = (props) => {
  return (
    <SpacingsStack scale="m">
      <Markdown.H3>{props.title}</Markdown.H3>
      <LayoutReleaseNoteBody {...props} />
    </SpacingsStack>
  );
};
ReleaseNote.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['feature', 'enhancement', 'fix']).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  body: PropTypes.string.isRequired,
};

export default ReleaseNote;
