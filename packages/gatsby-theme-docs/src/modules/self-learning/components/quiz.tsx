import { useState, useEffect, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import LoginButton from '../../sso/components/login-button';
import { useAttempt } from '../hooks/use-attempt';
import { useSubmitAttempt } from '../hooks/use-submit-attempt';
import QuizForm from './quiz-form';
import type { PassthroughData, SubmissionAttempt } from './quiz.types';
import { canUseDOM, getQuizOutcome, isTestUserEmail } from './quiz.utils';
import { AuthenticatedContextState } from '../../../components/authenticated-context';
import useAuthentication from '../../sso/hooks/use-authentication';

export const OUTCOME_CORRECT = 'correct';
export const OUTCOME_INCORRECT = 'incorrect';

let currentFormHeight = 0;

const QuizWrapper = styled.div<QuizOutcome>`
  padding: 20px;
  display: grid;
  place-items: center;
  min-height: 300px;
  border-radius: ${customProperties.borderRadius6};
  background: ${customProperties.colorNeutral90};
  border-left-width: 0.5rem;
  border-left-style: solid;
  border-left-color: ${({ outcome }) => {
    switch (outcome) {
      case OUTCOME_CORRECT:
        return designTokens.colorPrimary25;
      case OUTCOME_INCORRECT:
        return designTokens.colorError;
      default:
        return customProperties.colorInfo;
    }
  }};
`;

export type QuizOutcome = {
  outcome?: Outcome;
};

type QuizProps = {
  courseId: string;
  quizId: string;
};

/**
 * Payload structure returned by the API method:
 * /courses/{id}/quizzes/{quizid}/attempts
 *
 */
export type QuizAttempt = {
  attemptId: number;
  isSubmitted: boolean; // to differenciate between fetch and submit responses
  name: string; // unformatted text to be rendered as-is
  questions: Question[];
  feedback?: Feedback;
  additionaldata?: AdditionalData[];
};

/**
 * Defines the type of question. `singleOption` refers to a multiple choice question that the user
 * is allowed to pick one of.  `multipleOption` refers to a multiple choice question that the user
 * is allowed to pick multiple of.
 */
export type QuestionRenderType = 'singleOption' | 'multipleOption';

/**
 * If the single question outcome is correct or incorrect
 */
export type Outcome = 'correct' | 'incorrect';

/**
 * Single question outcome and explanatory text
 */
export type Feedback = {
  text?: string; // markdown
  outcome: Outcome;
};

export type AdditionalData = {
  id: string;
  title: string;
  content: string;
};

/**
 * Quiz question
 */
export type Question = {
  id: string;
  text: string; // markdown
  renderType: QuestionRenderType;
  feedback?: Feedback;
  answerOptions: AnswerOption[];
  passthroughData?: PassthroughData; // optional as it's needed because of Moodle implementation, it might disappear in the future
};

/**
 * Quiz answer
 */
export type AnswerOption = {
  name: string;
  value: string;
  text: string; // markdown
  selected: boolean;
  outcome?: Outcome;
};

const formattedError = (error: string, correlationId: string | undefined) =>
  correlationId ? `${error} (${correlationId})` : error;

const Quiz = (props: QuizProps) => {
  const {
    user: { profile },
  } = useContext(AuthenticatedContextState);
  const { isAuthenticated: isLoggedIn, isLoading: isAuthLoading } =
    useAuthentication();

  const [formAttemptData, setFormAttemptData] = useState<
    QuizAttempt | undefined
  >();

  const {
    submitAttempt,
    attempt: submitQuizData,
    isLoading: isSubmitting,
    error: submitError,
    correlationId: submitCorrelationId,
  } = useSubmitAttempt(props);

  const {
    fetchAttempt,
    attempt: quizData,
    isLoading,
    error,
    correlationId,
  } = useAttempt(props);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAttempt(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    setFormAttemptData(quizData);
  }, [quizData]);

  useEffect(() => {
    setFormAttemptData(submitQuizData);
  }, [submitQuizData]);

  const onQuizSubmit = useCallback(
    (attemptData: SubmissionAttempt) => {
      if (!quizData) {
        return;
      }
      submitAttempt(quizData.attemptId, attemptData, true);
    },
    [quizData, submitAttempt]
  );

  const onQuizRetry = async () => {
    await fetchAttempt(true);
  };

  const element = canUseDOM
    ? document.getElementById(`quiz-form-${props.quizId}`)
    : null;
  const style = element && getComputedStyle(element);

  currentFormHeight =
    style?.height && parseInt(style?.height) > currentFormHeight
      ? parseInt(style?.height)
      : currentFormHeight;

  const QuizContent = () =>
    isLoading ? (
      <div
        style={{
          height: currentFormHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingSpinner scale="l" maxDelayDuration={200}>
          Loading quiz...
        </LoadingSpinner>
      </div>
    ) : error ? (
      <ContentNotification type="error">
        {formattedError(error, correlationId)}
      </ContentNotification>
    ) : (
      <QuizForm
        quizData={formAttemptData}
        quizId={props.quizId}
        formHeight={currentFormHeight}
        isSubmitting={isSubmitting}
        submitError={
          submitError
            ? formattedError(submitError, submitCorrelationId)
            : undefined
        }
        isTestMode={isTestUserEmail(profile?.email || '')}
        onQuizSubmit={onQuizSubmit}
        onQuizRetry={onQuizRetry}
      />
    );

  const QuizArea = () =>
    !isLoggedIn ? (
      isAuthLoading ? (
        <LoadingSpinner
          data-testid="test-loading"
          scale="l"
          maxDelayDuration={200}
        >
          Logging you in...
        </LoadingSpinner>
      ) : (
        <LoginButton
          theme="primary"
          label="Log in to start the quiz"
          quizId={`quiz-${props.quizId}`}
          data-testid="quiz-login-button"
        />
      )
    ) : (
      <QuizContent />
    );

  return (
    <QuizWrapper
      id={`quiz-${props.quizId}`}
      data-testid="quiz-wrapper"
      outcome={getQuizOutcome(formAttemptData, isLoading)}
    >
      <QuizArea />
    </QuizWrapper>
  );
};

export default Quiz;
