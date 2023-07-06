import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyLoad } from '@commercetools-docs/ui-kit';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import VideoPlaceholder from './video-placeholder';
import { EVENT_VIDEO_PROGRESS } from '../modules/self-learning/hooks/use-learning-tracking';

const videoJsVersion = '8.3.0';

/**
 * Preset value. Evaluate overtime if any of these needs to be a prop
 */
const VIDEO_PRESETS = {
  controls: true,
  responsive: true,
  fluid: true,
  language: 'en',
  controlBar: {
    pictureInPictureToggle: !!document.pictureInPictureEnabled,
  },
};

const prepareVideoOptions = (videoUrl, poster) => {
  const sources = [{ src: videoUrl }];
  return { ...VIDEO_PRESETS, sources, poster };
};

const VideoPlayer = (props) => {
  const videoJsLoadStatus = useLazyLoad(
    `https://cdn.jsdelivr.net/npm/video.js@${videoJsVersion}/dist/video.min.js`,
    'script'
  );
  const videoJsCSSLoadStatus = useLazyLoad(
    `https://cdn.jsdelivr.net/npm/video.js@${videoJsVersion}/dist/video-js.min.css`,
    'link'
  );

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoJsLoadStatus === 'ready' && videoJsCSSLoadStatus === 'ready') {
      if (!playerRef.current) {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        const videojs = window.videojs;

        playerRef.current = videojs(
          videoElement,
          prepareVideoOptions(props.url, props.poster)
        );
      }
      const player = playerRef.current;
      let eventTriggered = false; // Flag to track event triggering

      player.on('timeupdate', () => {
        const completeThreshold = props.completeAtPercent
          ? parseInt(props.completeAtPercent) / 100
          : 0.8; // defaults to 80% (0.8)
        const currentTime = player.currentTime();
        const duration = player.duration();
        const progress = currentTime / duration;
        if (!eventTriggered && progress >= completeThreshold) {
          // Trigger custom event
          const customEvent = new CustomEvent(EVENT_VIDEO_PROGRESS, {
            detail: { progress },
          });
          const el = document.getElementById('application');
          el.dispatchEvent(customEvent);
          eventTriggered = true; // Set the flag to prevent further triggering
        }
      });
      return () => {
        if (player) {
          player.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [props, videoJsLoadStatus, videoJsCSSLoadStatus, playerRef]);

  return (
    <>
      {videoJsCSSLoadStatus === 'ready' && videoJsLoadStatus === 'ready' ? (
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
      ) : (
        <VideoPlaceholder>
          <LoadingSpinner scale="l" maxDelayDuration={0} />
        </VideoPlaceholder>
      )}
    </>
  );
};
VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  completeAtPercent: PropTypes.string,
};

export default VideoPlayer;
