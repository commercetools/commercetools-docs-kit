import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Top menu', () => {
  it('should toggle top menu and take a snapshot', () => {
    // Wait for Gastby to be fully loaded otherwise the click event won't be
    // handled correctly.
    // We can check for the existence of the `data-react-helmet` in the `html` document.
    cy.visit(URL_DOCS_SMOKE_TEST).get('html[data-react-helmet]');
    cy.findByLabelText('Open Top Menu').click();
    cy.findByRole('top-menu').should('be.visible');
    cy.findByRole('top-menu').within(() => {
      cy.findByText('Documentation').should('be.visible');
      cy.percySnapshot();
    });
    cy.findByLabelText('Close Top Menu').should('exist');
  });
  it('should close top menu when clicking on the search input', () => {
    // Wait for Gastby to be fully loaded otherwise the click event won't be
    // handled correctly.
    // We can check for the existence of the `data-react-helmet` in the `html` document.
    cy.visit(URL_DOCS_SMOKE_TEST).get('html[data-react-helmet]');
    cy.findByLabelText('Open Top Menu').click();
    cy.findByRole('top-menu').should('be.visible');
    cy.findByRole('top-menu').within(() => {
      cy.findByText('Documentation').should('be.visible');
    });
    cy.findByLabelText('Search').click();
    cy.findByLabelText('Open Top Menu').should('exist');
  });
});
