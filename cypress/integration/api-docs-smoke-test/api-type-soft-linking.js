import { URL_API_DOCS_SMOKE_TEST } from '../../support/urls';

describe('API type soft linking', () => {
  it('should go to page of a type, then find the page of linked property type', () => {
    cy.visit(URL_API_DOCS_SMOKE_TEST);
    cy.findByLabelText('Open ObjectTestType').should('exist');
    cy.findByLabelText('Open ObjectTestType').click();
    cy.findByLabelText('ObjectTestType definition').should('be.visible');
    cy.findByLabelText('Link to ArrayTestType').should('exist');
    cy.findByLabelText('Link to ArrayTestType').click();
    cy.findByLabelText('ArrayTestType definition').should('be.visible');
    cy.percySnapshot();
  });
});
