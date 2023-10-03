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
    cy.get('div[data-testid="desktop-top-menu"]').should('be.visible');
    cy.get('div[data-testid="desktop-top-menu"]')
      .filter(':visible')
      .within(() => {
        cy.findByText('Documentation').filter(':visible').should('be.visible');
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
    cy.get('div[data-testid="desktop-top-menu"]').should('be.visible');
    cy.get('div[data-testid="desktop-top-menu"]')
      .filter(':visible')
      .within(() => {
        cy.findByText('Documentation').filter(':visible').should('be.visible');
        cy.percySnapshot();
      });
    cy.findByLabelText('Search').click();
    cy.findByLabelText('Open Top Menu').should('exist');
  });
  it('should expand and contract level 3 when selecting a three levels menu item', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findByText('Components').click();
    cy.findByText('Mermaid Diagrams').click({ force: true });
    cy.get('div[data-testid="mermaid-diagram"]');
    cy.findByLabelText('Open Top Menu').click();
    cy.get('div[data-testid="desktop-top-menu"]').should('be.visible');
    cy.get('div[data-testid="desktop-top-menu"]')
      .filter(':visible')
      .within(() => {
        cy.findByText('Product with long title which spans on multiple lines')
          .filter(':visible')
          .click();
        cy.findByText('Getting started resources').filter(':visible').click();
        cy.findByText('GETTING STARTED PAGES').should('be.visible');

        cy.findByText('Product with long title which spans on multiple lines')
          .filter(':visible')
          .click();
        cy.findByText('GETTING STARTED PAGES').should('not.be.visible');
      });
  });
});
