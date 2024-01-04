import { URL_DOCS_SMOKE_TEST } from '../../support/urls';
const LONG_TIMEOUT = 10000;

describe('Ai Assistant', () => {
  it('should render login button when user is logged out', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    // just ensuring javascript is loaded
    cy.findByText('Components').click();
    cy.findByText('Mermaid Diagrams').click({ force: true });
    cy.get('div[data-testid="mermaid-diagram"]');
    // just ensuring javascript is loaded - end
    cy.get('[data-testid="ai-assistant-launch-button"]', {
      timeout: LONG_TIMEOUT,
    }).click();
    cy.get('#portals-container', { timeout: LONG_TIMEOUT }).within(() => {
      cy.get('[data-testid="quiz-login-button"]', { timeout: LONG_TIMEOUT })
        // Use should to assert the text content
        .should('have.text', 'ID | Log in to start the Assistant');
    });
  });

  it('should launch the chat after login', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    // just ensuring javascript is loaded
    cy.findByText('Components').click();
    cy.findByText('Mermaid Diagrams').click({ force: true });
    cy.get('div[data-testid="mermaid-diagram"]');
    // just ensuring javascript is loaded - end
    cy.get('[data-testid="ai-assistant-launch-button"]', {
      timeout: LONG_TIMEOUT,
    }).click();
    cy.get('#portals-container', { timeout: LONG_TIMEOUT }).within(() => {
      cy.get('[data-testid="quiz-login-button"]', { timeout: LONG_TIMEOUT })
        // Use should to assert the text content
        .should('have.text', 'ID | Log in to start the Assistant')
        .click();
    });
    cy.origin('https://auth.id.commercetools.com', () => {
      cy.get('input[id="username"]').type('test.user.chat@commercetools.com');
      cy.get('input[id="password"]').type('Qwerty123!');
      cy.get('button:visible[type="submit"]').click();
    });
    cy.get('#portals-container', { timeout: LONG_TIMEOUT }).within(() => {
      // Use cy.get to locate the div within the portal
      cy.get('[data-testid="ai-assistant-modal"]', { timeout: LONG_TIMEOUT })
        // Use should to assert that the div exists
        .should('be.visible');

      cy.get('[data-testid="chat-input-field"]', { timeout: LONG_TIMEOUT })
        .should('be.visible')
        .then(() => {
          cy.percySnapshot();
        });
    });
  });
});
