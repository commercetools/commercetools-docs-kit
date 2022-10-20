import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import 'video.js/dist/video-js.css';

const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = (playerRef.current = videojs(
        videoElement,
        props.options,
        () => {
          videojs.log('player is ready');
          props.onReady && props.onReady(player);
        }
      ));
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
  onReady: PropTypes.func,
  options: PropTypes.object,
};

export default VideoPlayer;
