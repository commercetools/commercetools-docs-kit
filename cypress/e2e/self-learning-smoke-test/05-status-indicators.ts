import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { ETestId, QUIZ_LOADING_TIMEOUT } from './e2e.const';

Then(
  'The course {string} status icon is {string}',
  (courseId: string, statusIcon: string) => {
    cy.get(`[data-testid="${ETestId.courseStatusIndicator}-${courseId}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    })
      .find(`svg[data-testid="${statusIcon}"]`)
      .should('exist');
  }
);

Then(
  'The course {string} topics indicators are {string}',
  (courseId: string, statusIcon: string) => {
    cy.get(`[data-testid="${ETestId.courseTopics}-${courseId}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    }).each(($element) => {
      cy.wrap($element)
        .find(`svg[data-testid="${statusIcon}"]`)
        .should('exist');
    });
  }
);
