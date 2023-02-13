import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { customProperties } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import useIsClientSide from '../hooks/use-is-client-side';

const VideoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding-bottom: 3em;
  background-color: ${customProperties.backgroundColorForTag};
`;

const VideoPlayerLazy = React.lazy(() => import('./video-player-client-side'));

const VideoPlayer = (props) => {
  const { isClientSide } = useIsClientSide();

  const placeholder = (
    <VideoPlaceholder>
      <LoadingSpinner scale="l" maxDelayDuration={500} />
    </VideoPlaceholder>
  );

  return (
    <div>
      {isClientSide ? (
        <React.Suspense fallback={placeholder}>
          <VideoPlayerLazy {...props} />
        </React.Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
};

export default VideoPlayer;
