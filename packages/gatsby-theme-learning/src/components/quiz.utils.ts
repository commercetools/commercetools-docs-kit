import type {
  PassthroughData,
  SubmissionAnswerValue,
  SubmissionAttempt,
} from './quiz.types';
import {
  QuizAttempt,
  Question,
  Outcome,
  OUTCOME_CORRECT,
  OUTCOME_INCORRECT,
} from './quiz';
import type { FormState } from './quiz-form';

const CUSTOM_PASSTHROUGH_PREFIX = 'customdata_';

const getPreselectedAnswers = (question: Question) => {
  const preSelectedAnswersArray = question.answerOptions.filter(
    (answer) => answer.selected === true
  );

  return question.renderType === 'multipleOption'
    ? preSelectedAnswersArray.map((answer) => answer.name)
    : preSelectedAnswersArray.map((answer) => answer.value).join();
};

/**
 * Initialises the object representing the state of the quiz form
 * It uses the quizData payload to dynamically add required fields to
 * the state.
 */
export const createFormModel = (quizData: QuizAttempt) => {
  return quizData.questions.reduce((acc: FormState, curr) => {
    const preSelectedAnswers = getPreselectedAnswers(curr);
    return {
      ...acc,
      [curr.id]: preSelectedAnswers,
    };
  }, {});
};

/**
 * Converts the question's passthroughParams object to a name/value array that matches
 * what expected by the attempts API
 */
const getQuestionPassthroughParams = (
  quizData: QuizAttempt,
  questionId: string
) => {
  return quizData.questions.find((question) => question.id === questionId)
    ?.passthroughData;
};

/**
 * Adds custom key/value pairs to the quiz passthrough parameters.
 * These parameters are not submitted to moodle, but they're just used as
 * utility to mantain client side state upon submission.
 * NOTE: currently only used to "persist" quiz name.
 */
const getCustomPassthroughParams = (quizData: QuizAttempt): PassthroughData => {
  return { [`${CUSTOM_PASSTHROUGH_PREFIX}quizname`]: quizData.name };
};

export const createAttemptPayload = (
  formState: FormState,
  quizData: QuizAttempt
): SubmissionAttempt => ({
  questions: Object.entries(formState)
    .map(([questionId, value]) => {
      const questionPassthrough = getQuestionPassthroughParams(
        quizData,
        questionId
      );
      const customPassthrough = getCustomPassthroughParams(quizData);
      const passthroughData = { ...questionPassthrough, ...customPassthrough };
      let answerValue: SubmissionAnswerValue | SubmissionAnswerValue[];
      if (Array.isArray(value)) {
        // multiple choice (checkboxes)
        answerValue = value
          .map((valueItem) =>
            quizData.questions
              .find((question) => question.id === questionId)
              ?.answerOptions.find((answer) => answer.name === valueItem)
          )
          .map((item) => ({
            name: item?.name || '',
            value: item?.value || '',
          }));
      } else {
        // single choice (radio)
        const singleAnswer = quizData.questions
          .find((question) => question.id === questionId)
          ?.answerOptions.find((answer) => answer.value === value);
        answerValue = {
          name: singleAnswer?.name || '',
          value: singleAnswer?.value || '',
        };
      }

      return {
        id: questionId,
        value: answerValue,
        ...(passthroughData && { passthroughData }),
      };
    })
    .reduce((acc, { id, ...rest }) => ({ ...acc, [id]: { ...rest } }), {}),
});

/**
 * TODO: the whole implementation needs to be revised as the UI doesn't fully support out needs
 * Evalutates if a specific question has an initial `outcome` coming from the API.
 * If that's the case, it also checks if the outcome is the expected one and returns
 * a boolean value.
 */
export const hasAnswerSpecificOutcome = (
  quizData: QuizAttempt,
  questionId: string,
  outcome: Outcome,
  answerName?: string
) => {
  const question = quizData.questions.find(
    (question) => question.id === questionId
  );
  if (!question) {
    return false;
  }
  if (question.renderType === 'singleOption') {
    // due to UI limitations, for single choice question, only the
    // question outcome is evaluated and applied to the whole RadioInput.Group component.
    return question.feedback?.outcome === outcome;
  }
  // for multiple choice, we can highlight the exact answer which is correct/incorrect
  return (
    quizData.questions
      .find((question) => question.id === questionId)
      ?.answerOptions.find((answer) => answer.name === answerName)?.outcome ===
    outcome
  );
};

export const isIncorrectAnswer = (
  quizData: QuizAttempt,
  questionId: string,
  answerName?: string
) =>
  hasAnswerSpecificOutcome(quizData, questionId, OUTCOME_INCORRECT, answerName);

export const isCorrectAnswer = (
  quizData: QuizAttempt,
  questionId: string,
  answerName?: string
) =>
  hasAnswerSpecificOutcome(quizData, questionId, OUTCOME_CORRECT, answerName);

export const isOptionChecked = (
  optionValue: string,
  selectedValues?: string[]
): boolean => selectedValues?.includes(optionValue) ?? false;

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * If the attempt data exist, it will return the attempt outcome,
 * if the form is loading (submitting) or no attempt data are found, undefined is returned
 */
export const getQuizOutcome = (
  formAttemptData: QuizAttempt | undefined,
  isLoading?: boolean
) => {
  if (isLoading) {
    return;
  }
  return formAttemptData?.isSubmitted
    ? formAttemptData.feedback?.outcome
    : undefined;
};

/**
 * Check if email matches the specified test users email format.
 * Test user emails should end with +test@commercetools.com,
 * e.g. john.doe+test@commercetools.com
 */
export const isTestUserEmail = (email: string): boolean => {
  const TEST_USER_EMAIL_REGEX = /\+test@commercetools\.com$/;
  return !!email.match(TEST_USER_EMAIL_REGEX);
};
