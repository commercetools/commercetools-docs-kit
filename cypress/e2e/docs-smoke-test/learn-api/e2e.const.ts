// IDs
export enum ETestId {
  avatarContainer = 'avatar-container',
  quizWrapper = 'quiz-wrapper',
  loginButton = 'login-button',
  quizLoading = 'quiz-loading',
  quizForm = 'quiz-form',
  quizFormSubmit = 'quiz-form-submit',
  avatarMenu = 'avatar-menu',
  avatarMenuLogout = 'avatar-menu-logout',
  quizFeedback = 'quiz-feedback',
  quizQuestionFeedback = 'quiz-question-feedback',
  tryAgainButton = 'try-again-button',
  multipleChoiceContainer = 'multiple-choice-container',
  singleChoiceContainer = 'multiple-choice-container',
  questionCheckbox = 'question-checkbox',
}

export const QUIZ_LOADING_TIMEOUT = 12 * 1000; //12 seconds

// TEST USER (standard)
export const TEST_USER_USERNAME = 'test.user+auth0@testdomain.tld';
export const TEST_USER_PASSWORD = 'Qwerty123!';

// TEST USER (editor)
export const EDITOR_TEST_USER_USERNAME = 'test.user+test@commercetools.com';
export const EDITOR_TEST_USER_PASSWORD = 'Qwerty123!';

// FEEDBACK
export const WRONG_ANSWER_COLOR = 'rgb(230, 0, 80)';
export const CORRECT_ANSWER_COLOR = 'rgb(0, 204, 180)';
export const WRONG_ANSWER_TEXT = 'Your answer is incorrect.';
export const CORRECT_ANSWER_TEXT = 'Your answer is correct.';
