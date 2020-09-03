import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Child sections nav', () => {
  it('should navigate to appropriate section', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}views/two-level-index-nav`);
    cy.get('#section-content-menu-with-first-level-heading').within(() => {
      cy.get('a[href="#sit"]').click();
    });
    cy.url().should(
      'eq',
      `${
        Cypress.config().baseUrl
      }${URL_DOCS_SMOKE_TEST}views/two-level-index-nav#sit`
    );
    cy.get('#section-sit').should('be.visible');
  });

  it('should not make highlighted menu item current item', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}views/two-level-index-nav#ipsum`);
    cy.findByLabelText('Page Table of Contents Navigation').within(() => {
      cy.get('a[href="#content-menu-with-first-level-heading"]')
        .invoke('attr', 'aria-current')
        .should('contain', 'false');
    });
  });
});
