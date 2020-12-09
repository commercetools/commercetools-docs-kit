import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Top menu', () => {
  it('should toggle top menu and take a snapshot', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findByLabelText('Open Top Menu').click();
    cy.get('#top-menu-container').should('be.visible');
    cy.findByRole('top-menu').should('be.visible');
    cy.findByLabelText('Close Top Menu').should('exist');
    cy.percySnapshot();
  });
  it('should close top menu when clicking on the search input', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findByLabelText('Open Top Menu').click();
    cy.findByRole('top-menu').should('be.visible');
    cy.findByLabelText('Search').click();
    cy.findByLabelText('Open Top Menu').should('exist');
  });
});
