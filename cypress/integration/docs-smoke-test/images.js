import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Images', () => {
  it('should take a clean snapshot of the images page', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}components/images`);
    cy.get('[role="page-navigation"]').within(() => {
      cy.get('a').each($el => {
        cy.wrap($el).click();
        cy.url().should('include', $el[0].getAttribute('href'));
        cy.wait(500); // give it a moment for the images to properly load
      });
      cy.percySnapshot();
    });
  });
});
