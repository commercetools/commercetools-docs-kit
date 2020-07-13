import { URL_API_DOCS_SMOKE_TEST } from '../../support/urls';

describe('API type soft linking', () => {
  it('should go to page of a type, then find the page of linked property type', () => {
    cy.visit(URL_API_DOCS_SMOKE_TEST);
    cy.get('#navigation-scroll-container').within(() => {
      cy.findByText('ArrayTestType').click();
    });
    cy.findByLabelText('ArrayTestType definition').should('be.visible');
    cy.get('.section-lead').within(() => {
      cy.findByText('IntegerTestType').click();
    });
    cy.findByLabelText('IntegerTestType definition').should('be.visible');
    cy.percySnapshot();
  });
});
