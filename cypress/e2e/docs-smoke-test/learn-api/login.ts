import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { URL_DOCS_SMOKE_TEST } from '../../../support/urls';

import {
  ETestId,
  QUIZ_LOADING_TIMEOUT,
  TEST_USER_PASSWORD,
  TEST_USER_USERNAME,
} from './e2e.const';

When('The user visits the self-learning site', () => {
  cy.visit(URL_DOCS_SMOKE_TEST);
});

When('The user clicks navigation link with href {string}', (href) => {
  cy.get('#navigation-scroll-container').get(`a[href *= "${href}"]`).click();
});

Given(`The user has navigated to a quiz page`, () => {
  cy.visit(URL_DOCS_SMOKE_TEST);
  cy.get('#navigation-scroll-container')
    .get(`a[href *= "components/quiz"]`)
    .click();
});

Given(`The user {string} logged in`, (loginState) => {
  if (loginState === 'is not') {
    cy.get(`header[id="top"]`)
      .find(`div[data-test-id="${ETestId.avatarContainer}"]`)
      .should('not.exist');
  } else if (loginState === 'is') {
    cy.get(`header[id="top"]`)
      .find(`div[data-test-id="${ETestId.avatarContainer}"]`)
      .should('exist');
  }
});

When(`The user scrolls to the quiz area`, () => {
  cy.get(`div[data-test-id="${ETestId.quizWrapper}"]`).scrollIntoView();
});

Then('The user sees a login button', () => {
  cy.get(`button[data-test-id="${ETestId.loginButton}"]`).should('exist');
});

When('The user submits valid auth0 credentials', () => {
  cy.origin(
    'https://auth.id.commercetools.com',
    { args: { TEST_USER_USERNAME, TEST_USER_PASSWORD } },
    ({ TEST_USER_USERNAME, TEST_USER_PASSWORD }) => {
      cy.get('input[id="username"]').type(TEST_USER_USERNAME);
      cy.get('input[id="password"]').type(TEST_USER_PASSWORD);
      cy.get('button[type="submit"]').click();
    }
  );
});

Then('The quiz loading icon is displayed', () => {
  cy.get(`div[data-test-id="${ETestId.quizLoading}"`).should('exist');
});

Then('The user sees quiz content', () => {
  cy.get(`[data-test-id="${ETestId.quizWrapper}"]`)
    .find(`[data-test-id="${ETestId.quizForm}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    })
    .should('exist');
});
