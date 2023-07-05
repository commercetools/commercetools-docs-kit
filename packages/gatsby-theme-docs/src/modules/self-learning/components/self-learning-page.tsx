import { ReactNode, useEffect, useState } from 'react';
import { CourseTopic } from '../external-types';
import React from 'react';

type SelfLearningPageProps = {
  children: ReactNode;
  topic: CourseTopic;
  isContentVisible: boolean;
};

export interface VideoProgressReachedEvent extends Event {
  detail: {
    progress: number;
  };
}

const SelfLearningPage = (props: SelfLearningPageProps) => {
  console.log('isContentVisible', props.isContentVisible);
  const [actType, setActType] = useState<string | undefined>();
  const pageviewRegexp = /^pageview/;
  const videoRegexp = /^video/;

  useEffect(() => {
    if (actType === 'pageview') {
      if (props.isContentVisible) {
        // TODO: track text activity as completed
        console.log(`User viewed text activity`);
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
          'videoProgressReached',
          handleVideoProgressReached
        );

        return () => {
          ancestorElement.removeEventListener(
            'videoProgressReached',
            handleVideoProgressReached
          );
        };
      }
    }
  }, [actType, props.isContentVisible]);

  useEffect(() => {
    if (props.topic?.activities[0]?.type === 'label') {
      const activityName = props.topic?.activities[0]?.name;
      if (pageviewRegexp.test(activityName)) {
        // text page activity
        setActType('pageview');
      } else if (videoRegexp.test(activityName)) {
        // video activity
        setActType('video');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.topic]);

  return <>{props.children}</>;
};

export default SelfLearningPage;
