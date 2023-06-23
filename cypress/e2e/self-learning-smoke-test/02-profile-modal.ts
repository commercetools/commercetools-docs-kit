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
    cy.get(`[data-testid="${ETestId.profileModal}"] button`)
      .find('svg')
      .within(() => {
        cy.get('title').should('contain', 'Close icon');
      });

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
  }
);
