import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import {
  CORRECT_ANSWER_COLOR,
  EDITOR_TEST_USER_PASSWORD,
  EDITOR_TEST_USER_USERNAME,
  ETestId,
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

export const clickStep = (clickArea: string) => {
  switch (clickArea) {
    case 'avatar container':
      cy.get(`div[data-testid="${ETestId.avatarContainer}"]`).click();
      break;
    case 'avatar icon':
      cy.get(`div[data-testid="${ETestId.avatarIcon}"]`).click();
      break;
    case 'logout button':
      cy.get(`[data-testid="${ETestId.logoutButton}"]`).click();
      break;
    case 'quiz login button':
      cy.get(`div[data-testid="${ETestId.quizLoginButton}"]`).click({
        force: true,
      });
      break;
    case 'avatar login button':
      cy.get(`div[data-testid="${ETestId.avatarLoginButton}"]`).click();
      break;
    case 'quiz submit button':
      cy.get(`[data-testid="${ETestId.quizFormSubmit}"]`).click();
      break;
    case 'try again button':
      cy.get(`[data-testid="${ETestId.tryAgainButton}"]`).click();
      break;
    default:
      break;
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

  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit(URL_SELF_LEARNING_SMOKE_TEST);
  cy.get(`button[data-testid="${ETestId.avatarLoginButton}"]`).click();
  performLogin(username, password);
  cy.get(`[data-testid="${ETestId.logoutButton}"]`).should('exist');
};

const loginToQuizStep = (user: string) => {
  const username: string =
    user === 'editor test user'
      ? EDITOR_TEST_USER_USERNAME
      : TEST_USER_USERNAME;
  const password: string =
    user === 'editor test user'
      ? EDITOR_TEST_USER_PASSWORD
      : TEST_USER_PASSWORD;

  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit(URL_SELF_LEARNING_SMOKE_TEST);
  cy.get('#navigation-scroll-container')
    .get(`a[href *= "course-1/quiz"]`)
    .click();
  cy.get(`div[data-testid="${ETestId.quizWrapper}"]`).scrollIntoView();
  cy.get(`div[data-testid="${ETestId.quizLoginButton}"]`).click({
    force: true,
  });
  performLogin(username, password);

  cy.get(`[data-testid="${ETestId.logoutButton}"]`).should('exist');
};

export const selectQuizAnswers = (result: string) => {
  cy.get(
    `[data-testid="${ETestId.quizForm}"]  div[data-testid="${ETestId.answerContainer}"]`
  ).each(($el, idx) => {
    if ($el.attr('data-test-type') === 'single-choice-container') {
      cy.get(
        `[data-testid="${ETestId.quizForm}"] > div:eq(${idx}) label[role="radio"]`
      ).each(($lableEl) => {
        if (
          $lableEl
            .text()
            .includes(`${result === 'correct' ? 'correct' : 'wrong'} answer`)
        ) {
          cy.wrap($lableEl).click();
        }
      });
    } else if ($el.attr('data-test-type') === 'multiple-choice-container') {
      cy.wrap($el)
        .get('div[data-test-type="multiple-choice-container"] label')
        .each(($lableEl, index) => {
          if (
            $lableEl
              .text()
              .includes(`${result === 'correct' ? 'correct' : 'wrong'} answer`)
          ) {
            const labelFor = $lableEl.attr('for');
            cy.get(`#${labelFor}`).click({ force: true });
          }
        });
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
  cy.url().should('include', '/quiz');
  cy.get('h4:first').should(
    'include.text',
    'Which of the following statements is correct about the commercetools product data model'
  );

  // passes first quiz
  selectQuizAnswers('correct');
  clickStep('quiz submit button');
  cy.get(`[data-testid="${ETestId.quizWrapper}"]`).should(
    'have.css',
    'border-left-color',
    CORRECT_ANSWER_COLOR
  );

  // navigate to second quiz page
  cy.get('div[data-testid="pagination-next"]').click();
  cy.url().should('include', '/2-quiz');
  cy.get('h4:first').should(
    'include.text',
    'Which of the following is NOT a product status in commercetools?'
  );

  // passes second quiz
  selectQuizAnswers('correct');
  clickStep('quiz submit button');
  cy.get(`[data-testid="${ETestId.quizWrapper}"]`).should(
    'have.css',
    'border-left-color',
    CORRECT_ANSWER_COLOR
  );
};

Then(`The user sees a page with {string} title`, (title) => {
  cy.get('h1').should('contain', title);
});

Given('The {string} is logged in', (user: string) => loginToQuizStep(user));

Given(`The user logs out`, () => {
  cy.get(`[data-testid="${ETestId.logoutButton}"]`).click();
  cy.get(`[data-testid="${ETestId.avatarLoginButton}"]`).should('be.visible');
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

When(
  'The user fills in {string} the profile details {string}, {string}, {string}',
  (which: string, firstName: string, lastName: string, company: string) => {
    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="firstName"]`
    )
      .should('have.length', 1)
      .each(($input) => {
        cy.wrap($input).clear().type(firstName);
      });

    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="lastName"]`
    )
      .should('have.length', 1)
      .each(($input) => {
        cy.wrap($input).clear().type(lastName);
      });

    if (which === 'all') {
      cy.get(
        `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="company"]`
      )
        .should('have.length', 1)
        .each(($input) => {
          cy.wrap($input).clear().type(company);
        });
    }
  }
);

When('The user submits the profile form', () => {
  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] button[label="Save"]`
  )
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

Given('The page has fully loaded', () => {
  cy.get('div[data-test-page-ready]').should(($div) => {
    const value = $div.attr('data-test-page-ready');
    expect(value).to.equal('true');
  });
});

Then('The avatar icon shows {string}', (initials: string) => {
  cy.get(`[data-testid="${ETestId.avatarIcon}"]`).should('have.text', initials);
});

Then("The user doesn't see a complete profile modal", () => {
  cy.get(`[data-testid="${ETestId.profileModal}"] div[name="main"]`).should(
    'not.exist'
  );
});

Given('The user sees a complete profile modal with empty fields', () => {
  cy.get(`[data-testid="${ETestId.profileModal}"] div[name="main"]`).should(
    'be.visible'
  );
  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[type="text"]`
  )
    .should('have.length', 3)
    .each(($input) => {
      cy.wrap($input).should('have.value', '');
    });
  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] button`
  ).should('be.disabled');
});

Then('The user sees a {string} completed modal', (type: string) => {
  const expectedText =
    type === 'course'
      ? 'completed this module'
      : 'completed this learning path';
  cy.get(`[data-testid="${ETestId.moduleCompleteModal}"] > div[name="main"]`)
    .contains(expectedText)
    .should('be.visible');
  cy.get(
    `[data-testid="${ETestId.moduleCompleteModal}"] > div[name="main"] button[label="Continue"]`
  ).click();
});
