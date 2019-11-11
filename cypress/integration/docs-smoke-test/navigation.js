import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Navigation', () => {
  describe('when viewport is smaller than desktop', () => {
    it('should toggle main left side navigation', () => {
      cy.setTabletViewport();
      cy.visit(URL_DOCS_SMOKE_TEST);
      cy.findByLabelText('Open main navigation').click();
      cy.get('aside').should('be.visible');
      cy.get('aside').within(() => {
        cy.findByText('Docs Smoke Test');
        cy.percySnapshot();
      });
    });
  });
});
