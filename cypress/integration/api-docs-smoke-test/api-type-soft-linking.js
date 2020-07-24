import { URL_API_DOCS_SMOKE_TEST } from '../../support/urls';

describe('API type soft linking', () => {
  it('should go to page of a type, then find the page of linked property type', () => {
    cy.viewport('macbook-13');
    cy.visit(URL_API_DOCS_SMOKE_TEST);
    cy.get('#navigation-scroll-container').within(() => {
      cy.findByText('Soft Linking First Page').click();
    });
    cy.findByLabelText('SoftLinkObject definition').should('be.visible');
    cy.get('.section-lead').within(() => {
      cy.findByText('SoftLinkArray').click();
    });
    cy.findByLabelText('SoftLinkArray definition').should('be.visible');
    cy.percySnapshot();
  });
});
