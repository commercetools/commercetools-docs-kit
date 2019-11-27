import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Viewports', () => {
  it('should take snapshots for mobile and tablet viewports', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findAllByText('Docs Smoke Test');
    // wait for menu button to appear
    cy.findByLabelText('Open main navigation');
    cy.percySnapshot(cy.state('runnable').fullTitle(), {
      widths: [512, 956],
    });
  });
});
