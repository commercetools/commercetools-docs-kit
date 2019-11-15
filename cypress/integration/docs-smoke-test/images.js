import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Images', () => {
  it('should take a clean snapshot of the images page', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}components/images`);
    cy.get('[role="page-navigation"]').within(() => {
      cy.findByText('Last section').click();
      cy.url().should('include', '#last-section');
      cy.percySnapshot();
    });
  });
});
