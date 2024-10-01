import { useState } from 'react';
import styled from '@emotion/styled';

import PageFeedbackButtons, {
  FEEDBACK_DOWN,
  FEEDBACK_UP,
} from './page-feedback-buttons';
import { designSystem } from '@commercetools-docs/ui-kit';
import { gtagEvent } from '../modules/sso/utils/analytics.utils';

const POSITIVE_SURVEY_ID = 3628; // id for the userguiding survey triggered by thumbs up click
const NEGATIVE_SURVEY_ID = 3627; // id for the userguiding survey triggered by thumbs down click
const USERGUIDING_SESSION_KEY = '__UGS__uid'; // local storage key for userguiding session
const USER_GUIDING_ID = 'U4I78799B6RID'; // userguiding user id for the embedded script
const MAX_SCRIPT_LOAD_TIME = 30 * 1000; // 30 seconds

const FeedbackQuestion = styled.div`
  padding-bottom: ${designSystem.dimensions.spacings.s};
`;

const PageFeedbackWrapper = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderPrimary};
  padding-top: ${designSystem.dimensions.spacings.l};
  font-size: ${designSystem.typography.fontSizes.small};
`;

const PageFeedback = () => {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  const isScriptLoaded = (): boolean => {
    const isUserGuidingSessionReady =
      localStorage.getItem(USERGUIDING_SESSION_KEY) !== null;
    const isUserGuidingScriptLoaded =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (window as any).userGuiding?.launchSurvey === 'function';
    return isUserGuidingScriptLoaded && isUserGuidingSessionReady;
  };

  const injectUserGuidingScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (isScriptLoaded()) {
        resolve(); // Script is already loaded, resolve immediately
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://eu-static.userguiding.com/media/user-guiding-${USER_GUIDING_ID}-embedded.js`;

      script.onload = () => {
        // Poll for userGuiding object in the global scope
        let loadTime = 0;
        const interval = setInterval(() => {
          if (isScriptLoaded()) {
            clearInterval(interval); // Stop polling
            resolve();
            return;
          }
          if (loadTime >= MAX_SCRIPT_LOAD_TIME) {
            clearInterval(interval); // Stop polling
            reject(new Error('Userguiding script loading timeout.'));
          }
          loadTime += 100;
        }, 100);
      };

      script.onerror = () => {
        reject(new Error('Userguiding script loading failed.'));
      };

      document.head.appendChild(script);
    });
  };

  const handleClick = async (feedback: number) => {
    setCurrentFeedback(feedback);

    // track the event on google analytics
    gtagEvent('page_feedback', {
      feedback_page: window.location.pathname,
      feedback_value: feedback.toString(),
    });

    try {
      await injectUserGuidingScript();
      const surveyId =
        feedback === FEEDBACK_UP ? POSITIVE_SURVEY_ID : NEGATIVE_SURVEY_ID;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).userGuiding?.launchSurvey(surveyId);
    } catch (error) {
      console.error(error);
    }
  };

  const isClickable = currentFeedback === 0;

  return (
    <PageFeedbackWrapper>
      <FeedbackQuestion>Was this page helpful?</FeedbackQuestion>
      <PageFeedbackButtons
        onPositiveClick={() => handleClick(FEEDBACK_UP)}
        onNegativeClick={() => handleClick(FEEDBACK_DOWN)}
        currentFeedback={currentFeedback}
        isPositiveClickable={isClickable}
        isNegativeClickable={isClickable}
        iconSize={30}
        positiveText="Yes"
        negativeText="No"
      />
    </PageFeedbackWrapper>
  );
};

export default PageFeedback;
