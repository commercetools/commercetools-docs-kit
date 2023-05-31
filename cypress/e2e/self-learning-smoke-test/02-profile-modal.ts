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
