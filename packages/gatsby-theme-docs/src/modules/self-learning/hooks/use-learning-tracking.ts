import { useEffect, useState } from 'react';
import { CourseTopic } from '../external-types';
import usePageVisibility from '../../../hooks/use-page-visibility';
import useIsClientSide from './use-is-client-side';

export const EVENT_VIDEO_PROGRESS = 'selflearning:video:progressReached';
export const EVENT_PAGECONTENT_VIEWED = 'selflearning:pageContent:viewed';

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

export const useLearningTrackingHandler = (topic: CourseTopic | undefined) => {
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
          EVENT_PAGECONTENT_VIEWED,
          handleContentPageViewed
        );

        return () => {
          ancestorElement.removeEventListener(
            EVENT_PAGECONTENT_VIEWED,
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
          EVENT_VIDEO_PROGRESS,
          handleVideoProgressReached
        );

        return () => {
          ancestorElement.removeEventListener(
            EVENT_VIDEO_PROGRESS,
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

export const useContentPageTrackingDispatcher = (isEnabled: boolean) => {
  const isContentVisible = usePageVisibility(isEnabled); // enabled only on self-learning pages
  const [eventTriggered, setEventTriggered] = useState(false);
  const { isClientSide } = useIsClientSide();

  useEffect(() => {
    if (isClientSide && isEnabled && !eventTriggered && isContentVisible) {
      const customEvent = new CustomEvent(EVENT_PAGECONTENT_VIEWED, {
        detail: { viewed: isContentVisible },
      });
      const el = document.getElementById('application');
      el?.dispatchEvent(customEvent);
      setEventTriggered(true);
    }
  }, [isContentVisible, eventTriggered, isEnabled, isClientSide]);
};
