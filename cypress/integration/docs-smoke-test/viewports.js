import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Viewports', () => {
  it('should take snapshots for mobile, tablet and desktop sizes', () => {
    cy.setDesktopViewport();
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findAllByText('Docs Smoke Test');
    cy.percySnapshot(cy.state('runnable').fullTitle(), {
      widths: [512, 1200, 1634],
    });
  });
});
