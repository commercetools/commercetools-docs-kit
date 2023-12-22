import { URL_DOCS_SMOKE_TEST } from '../../support/urls';
const LONG_TIMEOUT = 10000;

describe('Ai Assistant', () => {
  it('should render login button when user is logged out', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.get('[data-testid="ai-assistant-launch-button"]', {
      timeout: LONG_TIMEOUT,
    }).click();
    cy.get('#portals-container', { timeout: LONG_TIMEOUT }).within(() => {
      cy.get('[data-testid="quiz-login-button"]', { timeout: LONG_TIMEOUT })
        // Use should to assert the text content
        .should('have.text', 'ID | Log in to start the Assistant');
    });
  });
});
