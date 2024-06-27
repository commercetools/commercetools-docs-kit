import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  CORRECT_ANSWER_COLOR,
  CORRECT_ANSWER_TEXT,
  ETestId,
  WRONG_ANSWER_COLOR,
  WRONG_ANSWER_TEXT,
} from './e2e.const';
import { selectQuizAnswers } from '../../support/step_definitions/common.steps';
import { URL_SELF_LEARNING_SMOKE_TEST } from '../../support/urls';

Given(`The user deselect {string} answers`, (result) => {
  cy.get(`[data-testid="${ETestId.quizForm}"] p`).each(($el, index) => {
    if (
      $el
        .text()
        .includes(`${result === 'correct' ? 'correct' : 'wrong'} answer`)
    ) {
      cy.get(`[data-testid="${ETestId.quizForm}"] p`).eq(index).click();
    }
  });
});

Given(`The user selects {string} answers`, (result: string) => {
  selectQuizAnswers(result);
});

Then('The user sees a {string} ribbon on the quiz section', (feedbackColor) => {
  const hexColor =
    feedbackColor === 'red' ? WRONG_ANSWER_COLOR : CORRECT_ANSWER_COLOR;
  cy.get(`[data-testid="${ETestId.quizWrapper}"]`).should(
    'have.css',
    'border-left-color',
    hexColor
  );
});

Given(
  'The user sees {string} feedback messages below the anwsers',
  (feedback) => {
    const expectedFeedbackText =
      feedback === 'error' ? WRONG_ANSWER_TEXT : CORRECT_ANSWER_TEXT;
    cy.get(`[data-testid="${ETestId.quizQuestionFeedback}"]`).should(
      ($items) => {
        expect($items).to.have.length(2);
        expect($items.eq(0)).to.contain(expectedFeedbackText);
        expect($items.eq(1)).to.contain(expectedFeedbackText);
      }
    );
  }
);

Given('The user sees a try again button', () => {
  cy.get(`[data-testid="${ETestId.tryAgainButton}"]`).should('exist');
});

Given("The user doesn't see a try again button", () => {
  cy.get(`[data-testid="${ETestId.tryAgainButton}"]`).should('not.exist');
});

Then('The user gets redirected to {string}', (course: string) => {
  const expectedUrl =
    course === 'site root' ? URL_SELF_LEARNING_SMOKE_TEST.slice(0, -1) : course;
  cy.url().should('match', new RegExp(`${expectedUrl}$`));
});

Given(`The user has navigated to a quiz page with code`, () => {
  cy.visit(`${URL_SELF_LEARNING_SMOKE_TEST}course-with-code/quiz`);
});
