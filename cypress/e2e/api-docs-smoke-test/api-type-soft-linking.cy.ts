import { URL_API_DOCS_SMOKE_TEST } from '../../support/urls';

describe('API type soft linking', () => {
  it('should go to page of a type, then confirm type exists on the page', () => {
    cy.visit(URL_API_DOCS_SMOKE_TEST);
    cy.get('#navigation-scroll-container').within(() => {
      cy.findByText('E2E Tests').click();
      cy.findByText('Soft Linking First Page').click({ force: true });
    });
    cy.findByLabelText('SoftLinkObject definition').should('be.visible');
    cy.get('.section-lead').within(() => {
      cy.findByText('SoftLinkArray').click();
    });

    const typeElementId = 'ctp:test:type:SoftLinkArray';
    cy.url().should(
      'eq',
      `${
        Cypress.config().baseUrl
      }${URL_API_DOCS_SMOKE_TEST}e2e-tests/soft-linking-second-page#${typeElementId}`
    );
    cy.findByLabelText('SoftLinkArray definition').should('be.visible');
    cy.percySnapshot();
  });
});
