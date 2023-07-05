import React, { useEffect, useState } from 'react';
import { CourseTopic } from '../external-types';

export interface VideoProgressReachedEvent extends Event {
  detail: {
    progress: number;
  };
}

export interface ContentPageViewedEvent extends Event {
  detail: {
    viewed: boolean;
  };
}

const useLearningTopicTracking = (topic: CourseTopic | undefined) => {
  const [actType, setActType] = useState<string | undefined>();
  const pageviewRegexp = /^pageview/;
  const videoRegexp = /^video/;

  useEffect(() => {
    if (!topic) {
      return;
    }
    if (actType === 'pageview') {
      const handleContentPageViewed = (event: ContentPageViewedEvent) => {
        const videoProgressEvent = event as ContentPageViewedEvent;
        const viewed = videoProgressEvent.detail.viewed;
        // TODO: track content page viewed
        console.log(`User viewed content? ${viewed}`);
      };

      const ancestorElement = document.getElementById(
        'application'
      ) as HTMLElement;
      if (ancestorElement) {
        ancestorElement.addEventListener(
          'selflearning:pageContentViewed',
          handleContentPageViewed
        );

        return () => {
          ancestorElement.removeEventListener(
            'selflearning:pageContentViewed',
            handleContentPageViewed
          );
        };
      }
    }
    if (actType === 'video') {
      const handleVideoProgressReached = (event: VideoProgressReachedEvent) => {
        const videoProgressEvent = event as VideoProgressReachedEvent;
        const progress = videoProgressEvent.detail.progress;
        // TODO: track video activity as completed
        console.log(`User reached ${progress} of the video`);
      };

      const ancestorElement = document.getElementById(
        'application'
      ) as HTMLElement;
      if (ancestorElement) {
        ancestorElement.addEventListener(
          'selflearning:videoProgressReached',
          handleVideoProgressReached
        );

        return () => {
          ancestorElement.removeEventListener(
            'selflearning:videoProgressReached',
            handleVideoProgressReached
          );
        };
      }
    }
  }, [actType, topic]);

  useEffect(() => {
    if (topic?.activities[0].type === 'label') {
      const activityName = topic.activities[0].name;
      if (pageviewRegexp.test(activityName)) {
        // text page activity
        setActType('pageview');
      } else if (videoRegexp.test(activityName)) {
        // video activity
        setActType('video');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);
};

export default useLearningTopicTracking;
