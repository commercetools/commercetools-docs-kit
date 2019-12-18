import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Menu navigation', () => {
  describe('when viewport is smaller than desktop', () => {
    it('should toggle main left side navigation', () => {
      cy.setTabletViewport();
      cy.visit(URL_DOCS_SMOKE_TEST);
      cy.findByLabelText('Open main navigation').click();
      cy.findByLabelText('Main navigation').should('be.visible');
      cy.get('#modal-portal').within(() => {
        cy.findByText('Docs Smoke Test');
        cy.percySnapshot(cy.state('runnable').fullTitle(), {
          widths: [956],
        });
      });
    });
  });
});
