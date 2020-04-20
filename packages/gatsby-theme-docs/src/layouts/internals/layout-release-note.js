import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { ReleaseNote, designSystem } from '@commercetools-docs/ui-kit';
import Link from '../../components/link';
import LayoutReleaseNoteBody from './layout-release-note-body';

const linkStyles = css`
  text-decoration: none;
  color: ${designSystem.colors.light.textPrimary} !important;

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;
  }
`;

const LayoutReleaseNote = (props) => {
  return (
    <SpacingsStack scale="m">
      <ReleaseNote.H3>
        <Link css={linkStyles} href={props.slug}>
          {props.title}
        </Link>
      </ReleaseNote.H3>
      <LayoutReleaseNoteBody {...props} />
      {props.hasMore && <Link href={props.slug}>Read more...</Link>}
    </SpacingsStack>
  );
};
LayoutReleaseNote.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['feature', 'enhancement', 'fix']).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  hasMore: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNote;
