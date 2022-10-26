import React, { useRef, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { customProperties } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';

const VideoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  height: ${(props) => props.height}px;
  background-color: ${customProperties.backgroundColorForTag};
`;

const VideoPlayerLazy = React.lazy(() => import('./video-player-client-side'));

const VideoPlayer = (props) => {
  const isClientSide = typeof window !== 'undefined';

  return (
    <>
      {isClientSide ? (
        <React.Suspense
          fallback={
            <VideoPlaceholder>
              <LoadingSpinner scale="l" maxDelayDuration={500} />
            </VideoPlaceholder>
          }
        >
          <VideoPlayerLazy {...props} />
        </React.Suspense>
      ) : (
        <VideoPlaceholder />
      )}
    </>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
};

export default VideoPlayer;
