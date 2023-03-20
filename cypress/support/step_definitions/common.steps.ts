import {
  When,
  Then,
  Given,
  And,
} from '@badeball/cypress-cucumber-preprocessor';
import {
  EDITOR_TEST_USER_PASSWORD,
  EDITOR_TEST_USER_USERNAME,
  ETestId,
  QUIZ_LOADING_TIMEOUT,
  TEST_USER_PASSWORD,
  TEST_USER_USERNAME,
} from '../../e2e/docs-smoke-test/learn-api/e2e.const';
import { URL_DOCS_SMOKE_TEST } from '../urls';

const redirectionStep = (page) => {
  if (page === 'auth0 login page') {
    cy.origin('https://auth.id.commercetools.com', () => {
      cy.url().should('contain', 'auth.id.commercetools.com/u/login');
    });
  }
  if (page === 'quiz page') {
    cy.url().should(
      'match',
      /components\/quiz\/?#section-test-your-knowledge$/
    );
  }
  if (page === 'homepage') {
    cy.url().should('eq', Cypress.config().baseUrl);
  }
};

const clickStep = (clickArea) => {
  if (clickArea === 'avatar icon') {
    cy.get(`[data-test-id="${ETestId.avatarContainer}"]`).click();
  }
  if (clickArea === 'avatar menu logout button') {
    cy.get(`[data-test-id="${ETestId.avatarMenuLogout}"]`).click();
  }
  if (clickArea === 'login button') {
    cy.get(`button[data-test-id="${ETestId.loginButton}"]`).click({
      force: true,
    });
  }
  if (clickArea === 'quiz submit button') {
    cy.get(`[data-test-id="${ETestId.quizFormSubmit}"]`).click();
    cy.pause();
  }
  if (clickArea === 'try again button') {
    cy.get(`[data-test-id="${ETestId.tryAgainButton}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    }).click();
  }
};

const loginToQuizStep = (user: string, isNewAttempt: boolean) => {
  const username: string =
    user === 'editor test user'
      ? EDITOR_TEST_USER_USERNAME
      : TEST_USER_USERNAME;
  const password: string =
    user === 'editor test user'
      ? EDITOR_TEST_USER_PASSWORD
      : TEST_USER_PASSWORD;

  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit(URL_DOCS_SMOKE_TEST);
  cy.get('#navigation-scroll-container')
    .get(`a[href *= "components/quiz"]`)
    .click();
  if (isNewAttempt) {
    cy.intercept(
      {
        url: '**/api/courses/*/quizzes/*/attempts?forceNew=false',
      },
      (req) => {
        req.url = req.url.replace('forceNew=false', 'forceNew=true');
      }
    ).as('fetchAttempt');
  }
  cy.get(`div[data-test-id="${ETestId.quizWrapper}"]`).scrollIntoView();
  cy.get(`button[data-test-id="${ETestId.loginButton}"]`).click({
    force: true,
  });
  cy.origin(
    'https://auth.id.commercetools.com',
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input[id="username"]').type(username);
      cy.get('input[id="password"]').type(password);
      cy.get('button[type="submit"]').click();
    }
  );

  cy.get(`[data-test-id="${ETestId.quizWrapper}"]`)
    .find(`[data-test-id="${ETestId.quizForm}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    })
    .should('exist');
};

Then(`The user sees a page with {string} title`, (title) => {
  cy.get('h1').should('contain', title);
});

Given('The {string} is logged in', (user: string) =>
  loginToQuizStep(user, false)
);
Given(`The {string} is logged in with new attempt`, (user: string) =>
  loginToQuizStep(user, true)
);

And(`The user logs out`, () => {
  cy.get(`[data-test-id="${ETestId.avatarContainer}"]`).click();
  cy.get(`[data-test-id="${ETestId.avatarMenuLogout}"]`).click();
});

And('The avatar menu is displayed', () => {
  cy.get(`[data-test-id="${ETestId.avatarContainer}"]`).should('exist');
});

When('The user clicks the {string}', clickStep);
Then('The user is redirected to {string}', redirectionStep);
