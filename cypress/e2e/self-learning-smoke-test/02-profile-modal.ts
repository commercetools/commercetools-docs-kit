import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ETestId, TEST_USER_USERNAME } from './e2e.const';

Then("The user can't submit the form", () => {
  cy.get(
    `[data-testid="${ETestId.profileModal}"] > div[name="main"] button[label="Save"]`
  ).should('not.be.enabled');
});

When(
  'The user sees an update profile modal with the values {string}, {string}, {string}',
  (firstName: string, lastName: string, company: string) => {
    // let's make sure it's a proper "update profile" modal
    cy.get(`[data-testid="${ETestId.profileModal}"] div[name="main"]`).should(
      'be.visible'
    );

    cy.get(`[data-testid="${ETestId.profileModal}"]`)
      .find('h4')
      .contains('Update your profile');
    cy.get(
      `[data-testid="${ETestId.profileModal}"] button[label="Close dialog"]`
    ).should('exist');

    // then let's ensure the expected values are displayed
    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="firstName"]`
    ).should('have.value', firstName);

    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="lastName"]`
    ).should('have.value', lastName);

    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="company"]`
    ).should('have.value', company);
    cy.get(
      `[data-testid="${ETestId.profileModal}"] > div[name="main"] input[name="email"]`
    ).should('have.value', TEST_USER_USERNAME);
  }
);
