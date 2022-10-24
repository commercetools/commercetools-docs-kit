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
  height: ${(props) => props.height}px;
  background-color: ${customProperties.backgroundColorForTag};
`;

const VideoPlayerLazy = React.lazy(() => import('./video-player-client-side'));

const VideoPlayer = (props) => {
  const ref = useRef(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const isClientSide = typeof window !== 'undefined';

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const width = ref.current.offsetWidth;
    if (width) {
      const height = width * (10 / 16); // 16:10 ratio
      setPlaceholderHeight(height);
    }
  }, []);

  return (
    <>
      {isClientSide && (
        <React.Suspense
          fallback={
            <VideoPlaceholder height={placeholderHeight} ref={ref}>
              <LoadingSpinner scale="l" maxDelayDuration={500} />
            </VideoPlaceholder>
          }
        >
          <VideoPlayerLazy {...props} />
        </React.Suspense>
      )}
    </>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
};

export default VideoPlayer;
