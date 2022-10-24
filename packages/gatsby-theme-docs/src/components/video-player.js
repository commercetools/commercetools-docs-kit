import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const VideoPlayerLazy = React.lazy(() => import('./video-player-client-side'));

const VideoPlayer = (props) => {
  const isClientSide = typeof window !== 'undefined';
  return (
    <>
      {isClientSide && (
        <React.Suspense
          fallback={<LoadingSpinner scale="l" maxDelayDuration={500} />}
        >
          <VideoPlayerLazy {...props} />
        </React.Suspense>
      )}
    </>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
};

export default VideoPlayer;
