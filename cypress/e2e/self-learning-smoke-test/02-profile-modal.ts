import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ETestId } from './e2e.const';

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

Then("The user can't submit the form", () => {
  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] button`
  ).should('not.be.enabled');
});

Then("The user doesn't see a complete profile modal", () => {
  cy.get(`[data-testid="${ETestId.profileModal}"] div[name="main"]`).should(
    'not.exist'
  );
});
