import React, {
  useEffect,
  useState,
  SyntheticEvent,
  ChangeEvent,
  ReactElement,
} from 'react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import styled from '@emotion/styled';
import {
  createFormModel,
  createAttemptPayload,
  isIncorrectAnswer,
  isOptionChecked,
} from './quiz.utils';
import RadioInput from '@commercetools-uikit/radio-input';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import {
  CodeBlockMarkdownWrapper,
  markdownFragmentToReact,
} from '@commercetools-docs/ui-kit';
import type {
  QuizAttempt,
  QuizOutcome,
  AnswerOption,
  QuestionRenderType,
  Question,
  Feedback,
} from './quiz';
import { OUTCOME_INCORRECT } from './quiz';
import type { SubmissionAttempt } from './quiz.types';
import { designTokens } from '@commercetools-uikit/design-system';

const RENDER_TYPE_SINGLE: QuestionRenderType = 'singleOption';

const QuestionWrapper = styled.div`
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const SelectionContainer = styled.div`
  margin: 16px 8px 16px 8px;
`;

const QuestionFeedbackMessage = styled.div<QuizOutcome>`
  color: ${(props) =>
    props.outcome === 'correct'
      ? designTokens.colorSuccess25
      : designTokens.colorError};
`;

const QuestionFeedbackPlaceholder = styled.div`
  height: 24px;
`;

const QuizFeedbackMessageArea = styled.div<QuizOutcome>`
  margin: 16px 8px 16px 8px;
  p {
    font-weight: bold;
    color: ${(props) =>
      props.outcome === 'correct'
        ? designTokens.colorSuccess25
        : designTokens.colorError};
  }
`;

const QuizFeedbackPlaceholder = styled.div`
  height: 20px;
`;

/**
 * Local form state.
 */
export type FormState = Record<string, string | string[]>;

type QuizFormProps = {
  quizData: QuizAttempt | undefined;
  quizId: string;
  formHeight: number;
  isSubmitting: boolean;
  submitError: string | undefined;
  isTestMode: boolean;
  onQuizSubmit: (submissionAttempt: SubmissionAttempt) => void;
  onQuizRetry: () => void;
};

const QuizForm = (props: QuizFormProps) => {
  // local quiz form state
  const [formState, setFormState] = useState<FormState>({});

  useEffect(() => {
    if (props.quizData) {
      setFormState(createFormModel(props.quizData));
    }
  }, [props.quizData]);

  const isReadOnlyInput = () => props.quizData?.isSubmitted === true;

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      !props.quizData ||
      props.isSubmitting ||
      props.quizData.isSubmitted === true // extra safety
    ) {
      return;
    }
    const attemptPayload = createAttemptPayload(formState, props.quizData);
    props.onQuizSubmit(attemptPayload);
  };

  const onRetry = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onQuizRetry();
  };

  const handleFormStateChange = (questionId: string, value: string) => {
    setFormState({ ...formState, [questionId]: value });
  };

  const handleMultipleChoiceStateChange = (
    questionId: string,
    answerName: string,
    value: boolean
  ) => {
    if (!Array.isArray(formState[questionId])) {
      return;
    }
    let currentValues: string[] = formState[questionId] as string[];
    if (value === true && !currentValues.includes(answerName)) {
      // checking the checkbox
      currentValues = [...currentValues, answerName];
    }
    if (value === false && currentValues.includes(answerName)) {
      // unchecking the checkbox
      currentValues = currentValues.filter((item) => item !== answerName);
    }

    setFormState({ ...formState, [questionId]: currentValues });
  };

  const OptionWrapper = styled.div`
    div:first-of-type {
      align-items: center;
    }
  `;

  const renderAnswers = (
    answers: AnswerOption[],
    questionType: QuestionRenderType,
    feedback: Feedback | undefined,
    questionId: string
  ) => {
    return questionType === RENDER_TYPE_SINGLE ? (
      <SelectionContainer
        data-testid="answer-container"
        data-test-type="single-choice-container"
      >
        <Spacings.Stack scale="m">
          <RadioInput.Group
            hasError={isIncorrectAnswer(
              props.quizData as QuizAttempt,
              questionId
            )}
            isReadOnly={isReadOnlyInput()}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleFormStateChange(questionId, event.target.value)
            }
            value={(formState[questionId] as string) || ''}
          >
            {answers.map((answer, idx) => {
              return (
                <RadioInput.Option
                  key={`${answer.name}${idx}`}
                  value={answer.value}
                  components={{
                    wrapper: (children) => (
                      <OptionWrapper>{children}</OptionWrapper>
                    ),
                  }}
                >
                  {
                    //@ts-ignore
                    markdownFragmentToReact(answer?.text || '', {
                      pre: CodeBlockMarkdownWrapper,
                    }) as ReactElement
                  }
                </RadioInput.Option>
              );
            })}
          </RadioInput.Group>
          {feedback ? (
            <QuestionFeedbackMessage
              data-testid="quiz-question-feedback"
              outcome={feedback.outcome}
            >
              {
                // @ts-ignore
                markdownFragmentToReact(feedback.text || '')
              }
            </QuestionFeedbackMessage>
          ) : (
            <QuestionFeedbackPlaceholder />
          )}
        </Spacings.Stack>
      </SelectionContainer>
    ) : (
      <div>
        <SelectionContainer
          data-testid="answer-container"
          data-test-type="multiple-choice-container"
        >
          <Spacings.Stack scale="m">
            <Spacings.Stack scale="m">
              {answers.map((answer, index) => {
                return (
                  <CheckboxInput
                    key={answer.name}
                    value={answer.value}
                    onChange={(event) =>
                      handleMultipleChoiceStateChange(
                        questionId,
                        answer.name,
                        event.target.checked
                      )
                    }
                    name={questionId}
                    hasError={isIncorrectAnswer(
                      props.quizData as QuizAttempt,
                      questionId,
                      answer.name
                    )}
                    isReadOnly={isReadOnlyInput()}
                    isChecked={isOptionChecked(
                      answer.name,
                      formState[questionId] as string[]
                    )}
                    data-testid="question-checkbox"
                    id={`question-checkbox-${questionId}-${index}`}
                  >
                    {
                      // @ts-ignore
                      markdownFragmentToReact(answer?.text || '', {
                        pre: CodeBlockMarkdownWrapper,
                      }) as ReactElement
                    }
                  </CheckboxInput>
                );
              })}
            </Spacings.Stack>
            {feedback ? (
              <QuestionFeedbackMessage
                data-testid="quiz-question-feedback"
                outcome={feedback.outcome}
              >
                {
                  // @ts-ignore
                  markdownFragmentToReact(feedback.text || '')
                }
              </QuestionFeedbackMessage>
            ) : (
              <QuestionFeedbackPlaceholder />
            )}
          </Spacings.Stack>
        </SelectionContainer>
      </div>
    );
  };

  const renderQuestionEntry = (question: Question) => {
    const { id, text, renderType, feedback, answerOptions: answers } = question;
    return (
      <QuestionWrapper key={id}>
        <h4>
          {
            //@ts-ignore
            markdownFragmentToReact(text)
          }
        </h4>
        {renderAnswers(answers, renderType, feedback, id)}
      </QuestionWrapper>
    );
  };

  // checks if checkboxes (array value) or radio-inputs (string value) are empty or false
  const hasAnsweredQuestions = () => {
    const isFilled = Object.values(formState).map((question) => {
      return question.length > 0;
    });
    return isFilled.every(Boolean);
  };

  const ButtonArea = () => {
    if (!props.quizData?.isSubmitted) {
      return (
        <ButtonWrapper>
          <PrimaryButton
            data-testid="quiz-form-submit"
            label="Submit answers"
            type="submit"
            isDisabled={!hasAnsweredQuestions()}
          />
        </ButtonWrapper>
      );
    }
    if (
      props.isTestMode ||
      props.quizData?.feedback?.outcome === OUTCOME_INCORRECT
    ) {
      return (
        <ButtonWrapper>
          <SecondaryButton
            data-testid="try-again-button"
            label="Try again"
            onClick={onRetry}
          />
        </ButtonWrapper>
      );
    }
    return null;
  };

  const FormContent = () => {
    return props.submitError ? (
      <ContentNotification type="error">
        {props.submitError}
      </ContentNotification>
    ) : (
      <form
        data-testid="quiz-form"
        id={`quiz-form-${props.quizId}`}
        style={{ width: '100%' }}
        onSubmit={onSubmit}
      >
        {props.quizData?.questions.map(renderQuestionEntry)}
        <Spacings.Inline
          alignItems="center"
          justifyContent={
            props.quizData?.isSubmitted ? 'space-between' : 'flex-end'
          }
        >
          {props.quizData?.isSubmitted && props.quizData.feedback?.outcome ? (
            <QuizFeedbackMessageArea
              data-testid="quiz-feedback"
              outcome={props.quizData.feedback.outcome}
            >
              {props.quizData.feedback?.text && (
                <p>
                  {
                    // @ts-ignore
                    markdownFragmentToReact(props.quizData.feedback.text)
                  }
                </p>
              )}
            </QuizFeedbackMessageArea>
          ) : (
            <QuizFeedbackPlaceholder />
          )}
          <ButtonArea />
        </Spacings.Inline>
      </form>
    );
  };

  return (
    <>
      {props.quizData &&
        (props.isSubmitting ? (
          <div
            style={{
              height: props.formHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LoadingSpinner scale="l" maxDelayDuration={200}>
              Submitting answers...
            </LoadingSpinner>
          </div>
        ) : (
          <FormContent />
        ))}
    </>
  );
};

export default QuizForm;
