import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Code blocks', () => {
  it('should take a clean snapshot of the code blocks page', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}components/code-blocks`);
    cy.get('[role="page-navigation"]').within(() => {
      cy.get('a').each($el => {
        cy.wrap($el).click();
        cy.url().should('include', $el[0].getAttribute('href'));
        cy.wait(500); // give it a moment for the styles to properly load
      });
      cy.percySnapshot();
    });
  });
});
