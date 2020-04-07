import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';

const ReleaseNoteTitle = Markdown.withAnchorLink(Markdown.H3);

// TODO: implement designs
const ReleaseNote = (props) => {
  return (
    <SpacingsStack scale="m">
      <ReleaseNoteTitle>{props.title}</ReleaseNoteTitle>
      <div>{props.date}</div>
      <div>
        <MDXRenderer>{props.body}</MDXRenderer>
      </div>
    </SpacingsStack>
  );
};
ReleaseNote.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default ReleaseNote;
