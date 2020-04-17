import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

import LayoutReleaseNoteBody from './layout-release-note-body';
import Link from '../../components/link';

const linkStyles = css`
  text-decoration: none;
  color: ${designSystem.colors.light.textPrimary} !important;

  :hover {
    color: ${designSystem.colors.light.linkNavigation} !important;
  }
`;

const ReleaseNote = (props) => {
  return (
    <SpacingsStack scale="m">
      <Markdown.H3>
        <Link css={linkStyles} href={props.slug}>
          {props.title}
        </Link>
      </Markdown.H3>
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
