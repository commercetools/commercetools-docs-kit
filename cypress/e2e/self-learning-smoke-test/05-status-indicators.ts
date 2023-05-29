import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { ETestId, QUIZ_LOADING_TIMEOUT } from './e2e.const';

Then(
  'The course {string} status icon is {string}',
  (courseId: string, statusIcon: string) => {
    cy.get(`[data-test-id="${ETestId.courseStatusIndicator}-${courseId}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    })
      .find(`svg[data-test-id="${statusIcon}"]`)
      .should('exist');
  }
);

Then(
  'The course {string} topics indicators are {string}',
  (courseId: string, statusIcon: string) => {
    cy.get(`[data-test-id="${ETestId.courseTopics}-${courseId}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    }).each(($element) => {
      cy.wrap($element)
        .find(`svg[data-test-id="${statusIcon}"]`)
        .should('exist');
    });
  }
);
