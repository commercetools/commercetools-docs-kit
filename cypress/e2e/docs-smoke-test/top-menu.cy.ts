import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Top menu', () => {
  it('should load mermaid diagram and then toggle top menu and take a snapshot', () => {
    // Wait for Gastby to be fully loaded otherwise the click event won't be
    // handled correctly. We can go to the mermaid diagrams page and wait for the diagrams to be loaded
    // before clicking on the top menu.
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findByText('Components').click();
    cy.findByText('Mermaid Diagrams').click({ force: true });
    cy.get('div[data-testid="mermaid-diagram"]');
    cy.findByLabelText('Open Top Menu').click();
    cy.findByRole('top-menu').should('be.visible');
    cy.findByRole('top-menu').within(() => {
      cy.findByText('Documentation').should('be.visible');
      cy.percySnapshot();
    });
    cy.findByLabelText('Close Top Menu').should('exist');
  });
  it('should load mermaid diagram and then toggle top menu after clicking on the search input', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findByText('Components').click();
    cy.findByText('Mermaid Diagrams').click({ force: true });
    cy.get('div[data-testid="mermaid-diagram"]');
    cy.findByLabelText('Open Top Menu').click();
    cy.findByRole('top-menu').should('be.visible');
    cy.findByRole('top-menu').within(() => {
      cy.findByText('Documentation').should('be.visible');
    });
    cy.findByLabelText('Search').click();
    cy.findByLabelText('Open Top Menu').should('exist');
  });
});
