import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  CORRECT_ANSWER_COLOR,
  CORRECT_ANSWER_TEXT,
  ETestId,
  QUIZ_LOADING_TIMEOUT,
  WRONG_ANSWER_COLOR,
  WRONG_ANSWER_TEXT,
} from './e2e.const';

Given(`The user selects {string} answers`, (result) => {
  // get multiple choice answers.
  // hack to unselect pre-selected checkboxes as the more standard ways to do it, don't seem to work reliably
  cy.get(`[data-test-id="${ETestId.questionCheckbox}"]`, {
    timeout: QUIZ_LOADING_TIMEOUT,
  })
    .filter(':checked')
    .each((_, index) => {
      cy.get(`[data-test-id="${ETestId.questionCheckbox}"]`)
        .eq(index)
        .parent()
        .click();
    });

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
