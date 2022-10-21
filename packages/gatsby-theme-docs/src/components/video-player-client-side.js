import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import 'video.js/dist/video-js.css';

const prepareVideoOptions = (options, videoUrl, autoplay, poster) => {
  const currOptions = options || {};
  const sources = [{ src: videoUrl }];
  return { ...currOptions, sources, autoplay, poster };
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
        prepareVideoOptions(
          props.options,
          props.videoUrl,
          props.autoplay,
          props.thumbnail
        )
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
  videoUrl: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  thumbnail: PropTypes.string,
  options: PropTypes.object,
};

export default VideoPlayer;
