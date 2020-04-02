import React from 'react';
import PropTypes from 'prop-types';

const LayoutReleaseNotes = (props) => {
  return (
    <div>
      <div>{'TODO: this is the release note layout page'}</div>
      {props.children}
    </div>
  );
};
LayoutReleaseNotes.displayName = 'LayoutReleaseNotes';
LayoutReleaseNotes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutReleaseNotes;
