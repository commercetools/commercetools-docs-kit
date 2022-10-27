import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import 'video.js/dist/video-js.css';

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
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      playerRef.current = videojs(
        videoElement,
        prepareVideoOptions(props.url, props.poster)
      );
    }
  }, [props, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};
VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
};

export default VideoPlayer;
