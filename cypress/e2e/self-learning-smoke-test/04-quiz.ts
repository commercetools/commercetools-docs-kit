import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  CORRECT_ANSWER_COLOR,
  CORRECT_ANSWER_TEXT,
  ETestId,
  QUIZ_LOADING_TIMEOUT,
  WRONG_ANSWER_COLOR,
  WRONG_ANSWER_TEXT,
} from './e2e.const';
import { clickStep } from '../../support/step_definitions/common.steps';

const selectQuizAnswers = (result: string) => {
  cy.get(`[data-test-id="${ETestId.quizForm}"] p`).each(($el, index) => {
    if (
      $el
        .text()
        .includes(`${result === 'correct' ? 'correct' : 'wrong'} answer`)
    ) {
      cy.get(`[data-test-id="${ETestId.quizForm}"] p`).eq(index).click();
    }
  });
};

Given(`The user deselect {string} answers`, (result) => {
  cy.get(`[data-test-id="${ETestId.quizForm}"] p`).each(($el, index) => {
    if (
      $el
        .text()
        .includes(`${result === 'correct' ? 'correct' : 'wrong'} answer`)
    ) {
      cy.get(`[data-test-id="${ETestId.quizForm}"] p`).eq(index).click();
    }
  });
});

Given(`The user selects {string} answers`, (result: string) => {
  selectQuizAnswers(result);
});

Then('The user sees a {string} ribbon on the quiz section', (feedbackColor) => {
  const hexColor =
    feedbackColor === 'red' ? WRONG_ANSWER_COLOR : CORRECT_ANSWER_COLOR;
  cy.get(`[data-test-id="${ETestId.quizWrapper}"]`, {
    timeout: QUIZ_LOADING_TIMEOUT,
  }).should('have.css', 'border-left-color', hexColor);
});

Given(
  'The user sees {string} feedback messages below the anwsers',
  (feedback) => {
    const expectedFeedbackText =
      feedback === 'error' ? WRONG_ANSWER_TEXT : CORRECT_ANSWER_TEXT;
    cy.get(`[data-test-id="${ETestId.quizQuestionFeedback}"]`).should(
      ($items) => {
        expect($items).to.have.length(2);
        expect($items.eq(0)).to.contain(expectedFeedbackText);
        expect($items.eq(1)).to.contain(expectedFeedbackText);
      }
    );
  }
);

Given('The user sees a try again button', () => {
  cy.get(`[data-test-id="${ETestId.tryAgainButton}"]`, {
    timeout: QUIZ_LOADING_TIMEOUT,
  }).should('exist');
});

Given("The user doesn't see a try again button", () => {
  cy.get(`[data-test-id="${ETestId.tryAgainButton}"]`, {
    timeout: QUIZ_LOADING_TIMEOUT,
  }).should('not.exist');
});

const completeCourse = (courseFirsPage: string) => {
  // navigate to overview page
  cy.get('#navigation-scroll-container')
    .find(`a[href *= "${courseFirsPage}"]`)
    .click();

  // navigate to first quiz page
  cy.get('div[data-test-id="pagination-next"]').click();

  // passes first quiz
  selectQuizAnswers('correct');
  clickStep('quiz submit button');

  // navigate to second quiz page
  cy.get('div[data-test-id="pagination-next"]').click();

  // passes second quiz
  selectQuizAnswers('correct');
  clickStep('quiz submit button');
};

Given('The user completes {string} successfully', (course: string) => {
  switch (course) {
    case 'course-1':
      completeCourse('course-1/overview');
      break;
    case 'course-2':
      completeCourse('course-2/overview');
      break;
    default:
      break;
  }
});

Then('The user sees a {string} completed modal', (type: string) => {
  const expectedText =
    type === 'course'
      ? 'completed this module'
      : 'completed this learning path';
  cy.get(`[data-testid="${ETestId.moduleCompleteModal}"] > div[name="main"]`, {
    timeout: QUIZ_LOADING_TIMEOUT,
  })
    .contains(expectedText)
    .should('be.visible');
  cy.get(
    `[data-testid="${ETestId.moduleCompleteModal}"] > div[name="main"] button[label="Continue"]`
  ).click();
});
