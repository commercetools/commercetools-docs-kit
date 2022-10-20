import React from 'react';
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
          <VideoPlayerLazy />
        </React.Suspense>
      )}
    </>
  );
};

export default VideoPlayer;
