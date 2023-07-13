import { useEffect, useState } from 'react';
import { CourseTopic } from '../external-types';
import usePageVisibility from '../../../hooks/use-page-visibility';
import useIsClientSide from './use-is-client-side';
import { useTrackActivity } from './use-track-activity';

export const EVENT_VIDEO_PROGRESS = 'selflearning:video:progressReached';
export const EVENT_PAGECONTENT_VIEWED = 'selflearning:pageContent:viewed';

const pageviewRegexp = /^pageview/;
const videoRegexp = /^video/;

const getLabelActivityName = (topic?: CourseTopic) => {
  if (topic?.activities[0]?.type === 'label') {
    return topic.activities[0].name;
  }
};
const isPageviewActivity = (topic?: CourseTopic) => {
  const actName = getLabelActivityName(topic);
  return actName && pageviewRegexp.test(actName);
};
const isVideoActivity = (topic?: CourseTopic) => {
  const actName = getLabelActivityName(topic);
  return actName && videoRegexp.test(actName);
};

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

export const useLearningTrackingHandler = (
  courseId: number | undefined,
  topic: CourseTopic | undefined
) => {
  const [actType, setActType] = useState<string | undefined>();
  const { trackActivity } = useTrackActivity(
    courseId,
    topic?.activities[0].courseModuleId
  );

  useEffect(() => {
    if (!topic || topic.completed === true) {
      // if the topic is already completed, there's no need to listen for any UI
      // interaction that might trigger activity tracking
      return;
    }
    const ancestorElement = document.getElementById(
      'application'
    ) as HTMLElement;

    if (actType === 'pageview') {
      const handleContentPageViewed = (event: ContentPageViewedEvent) => {
        const videoProgressEvent = event as ContentPageViewedEvent;
        const viewed = videoProgressEvent.detail.viewed;
        if (viewed) {
          trackActivity(true);
        }
        ancestorElement.removeEventListener(
          EVENT_PAGECONTENT_VIEWED,
          handleContentPageViewed
        );
      };

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
        trackActivity(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actType, topic]);

  useEffect(() => {
    if (isPageviewActivity(topic)) {
      setActType('pageview');
    }
    if (isVideoActivity(topic)) {
      setActType('video');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);
};

export const useContentPageTrackingDispatcher = (
  topic: CourseTopic | undefined
) => {
  const isContentVisible = usePageVisibility(topic); // enabled only on self-learning pages
  const { isClientSide } = useIsClientSide();

  useEffect(() => {
    if (!topic || topic.completed === true) {
      // if the topic is already completed, there's no need to trigger any events,
      // just disable the hook
      return;
    }
    if (isClientSide && isPageviewActivity(topic) && isContentVisible) {
      const customEvent = new CustomEvent(EVENT_PAGECONTENT_VIEWED, {
        detail: { viewed: isContentVisible },
      });
      const el = document.getElementById('application');
      el?.dispatchEvent(customEvent);
    }
  }, [topic, isContentVisible, isClientSide]);
};
