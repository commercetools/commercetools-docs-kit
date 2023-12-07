import { URL_DOCS_SMOKE_TEST } from '../../support/urls';
const LONG_TIMEOUT = 10000;

describe('Ai Assistant', () => {
  it('should render login button when user is logged out', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}components/ai-assistant`);
    cy.get('[data-testid="quiz-login-button"]', { timeout: LONG_TIMEOUT })
      // Use should to assert the text content
      .should('have.text', 'Log in or sign up to use the chat assistant');
  });

  it('should render chat launch button when user is logged in and launch chat', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    // just ensuring javascript is loaded
    cy.findByText('Components').click();
    cy.findByText('Mermaid Diagrams').click({ force: true });
    cy.get('div[data-testid="mermaid-diagram"]'); // just ensuring javascript is loaded
    cy.findByText('Components').click();
    cy.findByText('Ai Assistant').click({ force: true });
    cy.get('div[data-testid="quiz-login-button"]').click();
    cy.origin('https://auth.id.commercetools.com', () => {
      cy.get('input[id="username"]').type('test.user.chat@commercetools.com');
      cy.get('input[id="password"]').type('Qwerty123!');
      cy.get('button:visible[type="submit"]').click();
    });
    cy.get('[data-testid="ai-assistant-launch-button"]', {
      timeout: LONG_TIMEOUT,
    }).should('have.text', 'Start Assistant');
    cy.get('[data-testid="ai-assistant-launch-button"]', {
      timeout: LONG_TIMEOUT,
    }).click();
    cy.get('#portals-container', { timeout: LONG_TIMEOUT })
      .should('exist')
      .within(() => {
        // Use cy.get to locate the div within the portal
        cy.get('[data-testid="ai-assistant-modal"]', { timeout: LONG_TIMEOUT })
          // Use should to assert that the div exists
          .should('exist');
        cy.percySnapshot();
      });
  });
});
