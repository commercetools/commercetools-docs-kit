import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import {
  EDITOR_TEST_USER_PASSWORD,
  EDITOR_TEST_USER_USERNAME,
  ETestId,
  QUIZ_LOADING_TIMEOUT,
  TEST_USER_PASSWORD,
  TEST_USER_USERNAME,
} from '../../e2e/self-learning-smoke-test/e2e.const';
import { URL_SELF_LEARNING_SMOKE_TEST } from '../urls';

const LEARN_API_FALLBACK = 'https://learning-api.docs.commercetools.com';
const resetAPIEndpoint = `${
  Cypress.env('LEARN_API') || LEARN_API_FALLBACK
}/api/users/delete-e2e`;

export const performLogin = (username: string, password: string) => {
  cy.origin(
    'https://auth.id.commercetools.com',
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input[id="username"]').type(username);
      cy.get('input[id="password"]').type(password);
      cy.get('button:visible[type="submit"]').click();
    }
  );
};

const redirectionStep = (page) => {
  if (page === 'auth0 login page') {
    cy.origin('https://auth.id.commercetools.com', () => {
      cy.url().should('contain', 'auth.id.commercetools.com/u/login');
    });
  }
  if (page === 'quiz page') {
    cy.url().should('match', /course-1\/quiz\/?#section-test-your-knowledge$/);
  }
  if (page === 'homepage') {
    cy.url().should('eq', Cypress.config().baseUrl);
  }
};

export const clickStep = (clickArea) => {
  if (clickArea === 'avatar icon') {
    cy.get(`div[data-testid="${ETestId.avatarContainer}"]`).click();
  }
  if (clickArea === 'logout button') {
    cy.get(`[data-testid="${ETestId.logoutButton}"]`).click();
  }
  if (clickArea === 'login button') {
    cy.get(`div[data-testid="${ETestId.loginButton}"]`).click({
      force: true,
    });
  }
  if (clickArea === 'quiz submit button') {
    cy.get(`[data-testid="${ETestId.quizFormSubmit}"]`).click();
  }
  if (clickArea === 'try again button') {
    cy.get(`[data-testid="${ETestId.tryAgainButton}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    }).click();
  }
};

export const resetUser = () => {
  cy.request({
    method: 'DELETE',
    url: resetAPIEndpoint,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 404]); // we allow 404 as it means the user has been already deleted
  });
};

const loginTopButtonStep = (user: string) => {
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
  cy.visit(URL_SELF_LEARNING_SMOKE_TEST);
  cy.get('button[data-testid="login-button"]').click();
  performLogin(username, password);
  cy.get(`[data-testid="${ETestId.logoutButton}"]`).should('exist');
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
  cy.visit(URL_SELF_LEARNING_SMOKE_TEST);
  cy.get('#navigation-scroll-container')
    .get(`a[href *= "course-1/quiz"]`)
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
  cy.get(`div[data-testid="${ETestId.quizWrapper}"]`).scrollIntoView();
  cy.get(`div[data-testid="${ETestId.loginButton}"]`).click({
    force: true,
  });
  performLogin(username, password);

  cy.get(`[data-testid="${ETestId.quizWrapper}"]`)
    .find(`[data-testid="${ETestId.quizForm}"]`, {
      timeout: QUIZ_LOADING_TIMEOUT,
    })
    .should('exist');
};

export const selectQuizAnswers = (result: string) => {
  cy.get(`[data-testid="${ETestId.quizForm}"] p`, {
    timeout: QUIZ_LOADING_TIMEOUT,
  }).each(($el, index) => {
    if (
      $el
        .text()
        .includes(`${result === 'correct' ? 'correct' : 'wrong'} answer`)
    ) {
      cy.get(`[data-testid="${ETestId.quizForm}"] p`, {
        timeout: QUIZ_LOADING_TIMEOUT,
      })
        .eq(index)
        .click();
    }
  });
};

const completeCourse = (courseFirsPage: string) => {
  // navigate to overview page
  cy.get('#navigation-scroll-container')
    .find(`a[href *= "${courseFirsPage}"]`)
    .click();

  // navigate to first quiz page
  cy.get('div[data-testid="pagination-next"]').click();

  // passes first quiz
  selectQuizAnswers('correct');
  clickStep('quiz submit button');

  // navigate to second quiz page
  cy.get('div[data-testid="pagination-next"]').click();

  // passes second quiz
  selectQuizAnswers('correct');
  clickStep('quiz submit button');
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
Given('The user is logged in for the first time', () => {
  resetUser();
  loginToQuizStep('user', false);
});

Given(`The user logs out`, () => {
  cy.get(`[data-testid="${ETestId.logoutButton}"]`).click();
});

Given('The avatar menu is displayed', () => {
  cy.get(`[data-testid="${ETestId.avatarContainer}"]`).should('exist');
});

When('The user clicks the {string}', clickStep);
Then('The user is redirected to {string}', redirectionStep);

Then('A snapshot is taken', () => {
  cy.percySnapshot();
});

Then('Attempt to reset e2e user', () => {
  resetUser();
});

When('The user fills in {string} the profile details', (which: string) => {
  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="firstName"]`
  )
    .should('have.length', 1)
    .each(($input) => {
      cy.wrap($input).type('FirstName');
    });

  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="lastName"]`
  )
    .should('have.length', 1)
    .each(($input) => {
      cy.wrap($input).type('LastName');
    });

  if (which === 'all') {
    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="company"]`
    )
      .should('have.length', 1)
      .each(($input) => {
        cy.wrap($input).type('Test corp.');
      });
  }
});

When('The user submits the profile form', () => {
  cy.get(`[data-testid="${ETestId.profileModal}"] > div[name="main"] button`)
    .should('be.enabled')
    .click();
});

When('The {string} logs in using the top login button', (user: string) => {
  loginTopButtonStep(user);
});

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

Given('The course status has fully loaded', () => {
  cy.get('[data-testid^="sidebar-course-status-"]', {
    timeout: QUIZ_LOADING_TIMEOUT,
  }).each(($element) => {
    cy.wrap($element).should('have.attr', 'data-test-course-loaded', 'true');
  });

  cy.get('[data-testid^="topic-status-"]', {
    timeout: QUIZ_LOADING_TIMEOUT,
  }).each(($element) => {
    cy.wrap($element).should('have.attr', 'data-test-topic-loaded', 'true');
  });
});
