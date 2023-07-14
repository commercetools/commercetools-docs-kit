import { useEffect, useState } from 'react';
import {
  CourseActivities,
  CourseTopic,
  SupportedActivitiesType,
} from '../external-types';
import usePageVisibility from '../../../hooks/use-page-visibility';
import useIsClientSide from './use-is-client-side';
import { useTrackActivity } from './use-track-activity';
import {
  MapContentItem,
  useTrackableContentByPageSlug,
} from './use-trackable-content';

export const EVENT_VIDEO_PROGRESS = 'selflearning:video:progressReached';
export const EVENT_PAGECONTENT_VIEWED = 'selflearning:pageContent:viewed';

const pageviewRegexp = /^pageview/;
const videoRegexp = /^video/;

const isPageviewActivity = (activity?: CourseActivities) => {
  return activity?.name && pageviewRegexp.test(activity.name);
};
const isVideoActivity = (activity?: CourseActivities) => {
  return activity?.name && videoRegexp.test(activity.name);
};

export interface VideoProgressReachedEvent extends Event {
  detail: {
    progress: number;
    url: string;
  };
}

export interface ContentPageViewedEvent extends Event {
  detail: {
    viewed: boolean;
  };
}

type PageActivity = {
  id: number;
  type: string;
  name: string;
  status: string;
};

const matchTrackingComponent = (
  activity: PageActivity,
  trackableItems?: MapContentItem[]
) => {
  if (!trackableItems) {
    return undefined;
  }
  return trackableItems.find(
    (item) => item.component.type.toLowerCase() === activity.type.toLowerCase()
  );
};

const getMdxAttributeValue = (
  matchedActivity: MapContentItem,
  attributeName: string
) =>
  matchedActivity.component.attributes.find(
    (item) => item.name === attributeName
  )?.value;

export const useLearningTrackingHandler = (
  courseId: number | undefined,
  topic: CourseTopic | undefined,
  pageSlug: string
) => {
  const [pageActivities, setPageActivities] = useState<
    PageActivity[] | undefined
  >(undefined);
  const { trackActivity } = useTrackActivity(courseId);
  const trackableItems = useTrackableContentByPageSlug(pageSlug);

  useEffect(() => {
    const ancestorElement = document.getElementById(
      'application'
    ) as HTMLElement;

    if (pageActivities === undefined) {
      return;
    }

    console.log('[DBG] activities found in API', pageActivities.length);
    pageActivities.forEach((pageActivity, index) => {
      console.log('[DBG] processing item', index, pageActivity);
      // 0. The activity is already completed, we don't even bother going further
      if (pageActivity.status === 'completed') {
        console.log('[DBG] activity complete - END ');
        return;
      }
      const matchedActivity = matchTrackingComponent(
        pageActivity,
        trackableItems
      );
      console.log('[DBG] matched Activity ', matchedActivity);
      // 1. activity exists in the API response (moodle) but is not matched in the mdx
      // in this case we mark the activity completed straight away unless it's pageview, which is never
      // matched by any actual mdx components but it will create a pageview listener
      if (pageActivity.type !== 'pageview' && !matchedActivity) {
        console.log('[DBG] unmatched - END ');
        trackActivity(pageActivity.id, true);
        return;
      }

      // 2. activity is pageview or has a matching element in the code. In this case we put in place
      // the code needed to track the activity. For the time being, Quiz is totally standalone so the tracking
      // will happen upon quiz submission. Pageview and video needs some further code (see below)
      if (pageActivity.type === 'pageview') {
        console.log('[DBG] pageview');

        const handleContentPageViewed = (event: ContentPageViewedEvent) => {
          const videoProgressEvent = event as ContentPageViewedEvent;
          const viewed = videoProgressEvent.detail.viewed;
          if (viewed) {
            console.log('[DBG] pageview tracked - END');
            trackActivity(pageActivity.id, true);
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

      if (pageActivity.type === 'video') {
        console.log('[DBG] video', matchedActivity);

        const handleVideoProgressReached = (
          event: VideoProgressReachedEvent
        ) => {
          // let's make sure we're tracking the correct video
          if (
            matchedActivity &&
            event.detail.url === getMdxAttributeValue(matchedActivity, 'url')
          ) {
            console.log('[DBG] video tracked - END', event.detail.url);
            trackActivity(pageActivity.id, true);
          }
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageActivities, trackableItems]);

  useEffect(() => {
    console.log('[DBG]', topic?.activities);
    const pageActs: PageActivity[] =
      topic?.activities
        .filter((act) => act.type === 'label' || 'quiz')
        .map((act) => {
          let learningType: string = act.type;
          if (isPageviewActivity(act)) {
            learningType = 'pageview';
          }
          if (isVideoActivity(act)) {
            learningType = 'video';
          }
          return {
            id: act.courseModuleId,
            name: act.name,
            type: learningType,
            status: act.completionStatus,
          };
        }) || [];

    setPageActivities(pageActs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);
};

export const useContentPageTrackingDispatcher = (
  topic: CourseTopic | undefined
) => {
  const isContentVisible = usePageVisibility(topic); // enabled only on self-learning pages
  const { isClientSide } = useIsClientSide();

  useEffect(() => {
    if (!topic) {
      return;
    }
    const pageviewActivity = topic.activities.find(isPageviewActivity);
    if (isClientSide && pageviewActivity && isContentVisible) {
      const customEvent = new CustomEvent(EVENT_PAGECONTENT_VIEWED, {
        detail: { viewed: isContentVisible },
      });
      const el = document.getElementById('application');
      el?.dispatchEvent(customEvent);
    }
  }, [topic, isContentVisible, isClientSide]);
};
