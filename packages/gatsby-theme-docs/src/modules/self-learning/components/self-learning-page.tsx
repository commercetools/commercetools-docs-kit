import { useEffect, useState } from 'react';
import { CourseTopic } from '../external-types';

type SelfLearningPageProps = {
  topic: CourseTopic;
};

export interface VideoProgressReachedEvent extends Event {
  detail: {
    progress: number;
  };
}

const SelfLearningPage = (props: SelfLearningPageProps) => {
  const [actType, setActType] = useState<string | undefined>();
  const pageviewRegexp = /^pageview/;
  const videoRegexp = /^video/;

  useEffect(() => {
    const handleVideoProgressReached = (event: VideoProgressReachedEvent) => {
      const videoProgressEvent = event as VideoProgressReachedEvent;
      const progress = videoProgressEvent.detail.progress;
      // TODO: track video activity as completed
      console.log(`User reached ${progress} of the video`);
    };

    const ancestorElement = document.getElementById(
      'application'
    ) as HTMLElement;
    if (actType === 'video' && ancestorElement) {
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
  }, [actType]);

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

  return <p>{actType}</p>;
};

export default SelfLearningPage;
