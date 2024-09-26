import { useState } from 'react';
import styled from '@emotion/styled';

import PageFeedbackButtons, {
  FEEDBACK_DOWN,
  FEEDBACK_UP,
} from './page-feedback-buttons';
import { designSystem } from '@commercetools-docs/ui-kit';

const POSITIVE_SURVEY_ID = 3628;
const NEGATIVE_SURVEY_ID = 3627;

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof (window as any).userGuiding?.launchSurvey === 'function';
  };

  const injectUserGuidingScript = (): Promise<void> => {
    const USER_GUIDING_ID = 'U4I78799B6RID';
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
        const interval = setInterval(() => {
          if (isScriptLoaded()) {
            clearInterval(interval); // Stop polling
            setTimeout(() => {
              resolve();
            }, 100); // Wait for another 100ms before resolving
            return;
          }
        }, 100);
      };

      script.onerror = () => {
        reject(new Error('Script loading failed.'));
      };

      document.head.appendChild(script);
    });
  };

  const handleClick = async (feedback: number) => {
    setCurrentFeedback(feedback);

    await injectUserGuidingScript();
    if (isScriptLoaded()) {
      const surveyId =
        feedback === FEEDBACK_UP ? POSITIVE_SURVEY_ID : NEGATIVE_SURVEY_ID;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).userGuiding?.launchSurvey(surveyId);
    }
  };

  return (
    <PageFeedbackWrapper>
      <FeedbackQuestion>Was this page helpful?</FeedbackQuestion>
      <PageFeedbackButtons
        onPositiveClick={() => handleClick(FEEDBACK_UP)}
        onNegativeClick={() => handleClick(FEEDBACK_DOWN)}
        currentFeedback={currentFeedback}
        isPositiveClickable={currentFeedback === 0}
        isNegativeClickable={currentFeedback === 0}
        iconSize={30}
        positiveText="Yes"
        negativeText="No"
      />
    </PageFeedbackWrapper>
  );
};

export default PageFeedback;
